import pool from "./config/database.js";
import { login } from "./services/auth.js";
import jwt from "jsonwebtoken";

const BASE_URL = "http://localhost:6970";

async function runTestSuite() {
    console.log("==========================================================");
    console.log("   INICIANDO BATERÍA DE PRUEBAS INTEGRALES (E2E)");
    console.log("   SISTEMA DE COMEDOR ESCOLAR");
    console.log("==========================================================\n");

    let testsPassed = 0;
    let testsFailed = 0;

    const assert = (condition, desc) => {
        if (condition) {
            console.log(`  ✅ [PASS] ${desc}`);
            testsPassed++;
        } else {
            console.error(`  ❌ [FAIL] ${desc}`);
            testsFailed++;
        }
    };

    let tokenAdmin = "";
    let tokenDirectivo = "";

    const createdInsumoIds = new Set();
    const createdProduccionIds = new Set();

    try {
        // ----------------------------------------------------
        // TEST 1: AUTENTICACIÓN Y GENERACIÓN DE TOKENS
        // ----------------------------------------------------
        console.log("👉 1. Pruebas de Autenticación y Roles...");
        const loginOk = await login("44480378", "44480378");
        assert(loginOk.access_token && Boolean(loginOk.nombre), `Login exitoso con DNI 44480378 (Usuario: ${loginOk.nombre})`);
        tokenAdmin = loginOk.access_token;

        const loginFail = await login("44480378", "clave_falsa");
        assert(loginFail.error === "Dni y/o contraseña incorrectos", "Rechazo correcto de contraseña errónea");

        // Crear token de prueba con rol exclusivo de DIRECTIVOS (rol 3)
        tokenDirectivo = jwt.sign({
            id: 999,
            nombre: "Director Test",
            dni: "99999999",
            roles: [3]
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        assert(tokenDirectivo.length > 0, "Token para rol DIRECTIVOS generado correctamente");

        // ----------------------------------------------------
        // TEST 2: GESTIÓN DE INSUMOS
        // ----------------------------------------------------
        console.log("\n👉 2. Pruebas del Módulo de Insumos...");
        const resInsumos = await fetch(`${BASE_URL}/insumos`, {
            headers: { Authorization: `Bearer ${tokenAdmin}` }
        });
        const listaInsumos = await resInsumos.json();
        assert(resInsumos.status === 200 && Array.isArray(listaInsumos), `Listar insumos (Total: ${listaInsumos.length})`);

        // Crear insumo temporal de prueba
        const codigoPrueba = "TST" + Math.floor(1000 + Math.random() * 9000);
        const resCrearInsumo = await fetch(`${BASE_URL}/insumos`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenAdmin}` },
            body: JSON.stringify({
                codigo: codigoPrueba,
                producto: "Insumo Test Automatizado",
                marca: "Marca Test",
                id_unidad_de_medida: 1, // kg
                stock: 50.00
            })
        });
        assert(resCrearInsumo.status === 200, "Creación de nuevo insumo");

        // Buscar el insumo creado
        const [rowsInsumo] = await pool.query("SELECT * FROM insumo WHERE codigo = ?", [codigoPrueba]);
        const testInsumo = rowsInsumo[0];
        assert(testInsumo && parseFloat(testInsumo.stock) === 50.00, "Insumo guardado en MySQL con stock decimal 50.00");
        if (testInsumo?.id) {
            createdInsumoIds.add(testInsumo.id);
        }

        // ----------------------------------------------------
        // TEST 3: GESTIÓN DE PROVEEDORES
        // ----------------------------------------------------
        console.log("\n👉 3. Pruebas de Proveedores...");
        const resProv = await fetch(`${BASE_URL}/proveedor`, {
            headers: { Authorization: `Bearer ${tokenAdmin}` }
        });
        const listaProv = await resProv.json();
        assert(resProv.status === 200 && Array.isArray(listaProv), `Listar proveedores (Total: ${listaProv.length})`);

        // ----------------------------------------------------
        // TEST 4: PRECIOS, COMPRAS Y SUMA AUTOMÁTICA DE STOCK
        // ----------------------------------------------------
        console.log("\n👉 4. Pruebas de Compras y Aumento de Stock...");
        const stockAntesCompra = parseFloat(testInsumo.stock);
        const resCompra = await fetch(`${BASE_URL}/precio`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenAdmin}` },
            body: JSON.stringify({
                insumo_id: testInsumo.id,
                proveedor_id: 1,
                precio_unitario: 1200.50,
                fecha_desde: "2026-09-25 10:00:00",
                fecha_vencimiento: "2026-10-15",
                cantidad: 20.50
            })
        });
        assert(resCompra.status === 200, "Registro de compra exitosa");

        const [insumoPostCompra] = await pool.query("SELECT stock FROM insumo WHERE id = ?", [testInsumo.id]);
        const stockPostCompra = parseFloat(insumoPostCompra[0].stock);
        assert(stockPostCompra === Number((stockAntesCompra + 20.50).toFixed(2)), `Stock aumentó de ${stockAntesCompra} a ${stockPostCompra} (+20.50 kg)`);

        // ----------------------------------------------------
        // TEST 5: PRODUCCIÓN (DESCUENTO AUTOMÁTICO, ALERTAS Y REVERSIONES)
        // ----------------------------------------------------
        console.log("\n👉 5. Pruebas de Producción (Fase 1 y Pantalla de Cocina)...");
        // Registrar producción consumiendo 15.00 kg del insumo
        const resProd = await fetch(`${BASE_URL}/produccion`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenAdmin}` },
            body: JSON.stringify({
                receta_id: 2, // Pizza
                cantidad_producida: 25,
                cantidad_comensales: 100,
                turno: "mañana",
                insumos: [
                    { value: testInsumo.id, label: testInsumo.producto, cantidad: 15.00 }
                ]
            })
        });
        const dataProd = await resProd.json();
        assert(resProd.status === 200 && dataProd.mensaje, "Registro de producción con descuento de stock");
        const produccionId = dataProd.id;
        if (produccionId) {
            createdProduccionIds.add(produccionId);
        }

        const [insumoPostProd] = await pool.query("SELECT stock FROM insumo WHERE id = ?", [testInsumo.id]);
        const stockPostProd = parseFloat(insumoPostProd[0].stock);
        assert(stockPostProd === Number((stockPostCompra - 15.00).toFixed(2)), `Descuento automático verificado: Stock cayó a ${stockPostProd} (-15.00 kg)`);

        // Verificar el cálculo del Costo Primo Total
        const [lastProd] = await pool.query("SELECT id, costo_primo_total FROM produccion WHERE id = ?", [produccionId]);
        assert(lastProd.length > 0 && parseFloat(lastProd[0].costo_primo_total) > 0, `Cálculo automático de Costo Primo Total: $${lastProd[0]?.costo_primo_total}`);

        // Dar de baja la producción -> Debe reintegrar los 15 kg al stock
        const resBaja = await fetch(`${BASE_URL}/produccion/${produccionId}/estado/1`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${tokenAdmin}` }
        });
        assert(resBaja.status === 200, "Baja de producción");

        const [insumoPostBaja] = await pool.query("SELECT stock FROM insumo WHERE id = ?", [testInsumo.id]);
        const stockPostBaja = parseFloat(insumoPostBaja[0].stock);
        assert(stockPostBaja === stockPostCompra, `Stock repuesto a despensa tras baja de producción (${stockPostBaja} kg)`);

        // Reactivar la producción -> Debe volver a descontar los 15 kg
        const resAlta = await fetch(`${BASE_URL}/produccion/${produccionId}/estado/0`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${tokenAdmin}` }
        });
        assert(resAlta.status === 200, "Reactivación de producción");

        const [insumoPostAlta] = await pool.query("SELECT stock FROM insumo WHERE id = ?", [testInsumo.id]);
        const stockPostAlta = parseFloat(insumoPostAlta[0].stock);
        assert(stockPostAlta === Number((stockPostCompra - 15.00).toFixed(2)), `Stock re-descontado tras reactivación (${stockPostAlta} kg)`);

        // Prueba de sobreconsumo -> Alerta de stock negativo/crítico
        const resSobreconsumo = await fetch(`${BASE_URL}/produccion`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenAdmin}` },
            body: JSON.stringify({
                receta_id: 2,
                cantidad_producida: 10,
                cantidad_comensales: 40,
                turno: "tarde",
                insumos: [
                    { value: testInsumo.id, label: testInsumo.producto, cantidad: 100.00 } // Supera el stock
                ]
            })
        });
        const dataSobreconsumo = await resSobreconsumo.json();
        assert(dataSobreconsumo.alertas && dataSobreconsumo.alertas.length > 0, `Generación exitosa de alerta de stock negativo: ${dataSobreconsumo.alertas[0]}`);
        if (dataSobreconsumo.id) {
            createdProduccionIds.add(dataSobreconsumo.id);
        }

        // ----------------------------------------------------
        // TEST 6: CONTROL BROMATOLÓGICO Y ROTACIÓN FIFO
        // ----------------------------------------------------
        console.log("\n👉 6. Pruebas de Control Bromatológico y FIFO...");
        const resAlertasVenc = await fetch(`${BASE_URL}/precio/vencimientos/alertas`, {
            headers: { Authorization: `Bearer ${tokenAdmin}` }
        });
        const dataAlertas = await resAlertasVenc.json();
        assert(resAlertasVenc.status === 200 && dataAlertas.resumen, "Endpoint de alertas bromatológicas responde 200 OK");
        assert(dataAlertas.resumen.totalAlertas >= 0, `Resumen de alertas procesado (${dataAlertas.resumen.totalAlertas} alertas detectadas)`);
        assert(Array.isArray(dataAlertas.sugerenciasFIFO), `Sugerencias FIFO generadas (${dataAlertas.sugerenciasFIFO.length} lotes a rotar)`);

        // ----------------------------------------------------
        // TEST 7: PERMISOS Y AUDITORÍA PARA EL ROL DIRECTIVOS
        // ----------------------------------------------------
        console.log("\n👉 7. Pruebas de Accesos del Rol Directivos (Rol 3)...");
        const resProdDirectivo = await fetch(`${BASE_URL}/produccion`, {
            headers: { Authorization: `Bearer ${tokenDirectivo}` }
        });
        assert(resProdDirectivo.status === 200, "Rol DIRECTIVOS puede auditar producciones sin 403 Forbidden");

        const resRecetaDirectivo = await fetch(`${BASE_URL}/receta`, {
            headers: { Authorization: `Bearer ${tokenDirectivo}` }
        });
        assert(resRecetaDirectivo.status === 200, "Rol DIRECTIVOS puede consultar recetas");

        const resVencDirectivo = await fetch(`${BASE_URL}/precio/vencimientos/alertas`, {
            headers: { Authorization: `Bearer ${tokenDirectivo}` }
        });
        assert(resVencDirectivo.status === 200, "Rol DIRECTIVOS puede ver alertas de vencimiento en Dashboard");

        // Verificar que DIRECTIVOS NO PUEDA modificar o registrar producción (restringido a Cocina/Admin)
        const resPostDirectivo = await fetch(`${BASE_URL}/produccion`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenDirectivo}` },
            body: JSON.stringify({ receta_id: 2, cantidad_producida: 1, cantidad_comensales: 1, turno: "mañana", insumos: [] })
        });
        assert(resPostDirectivo.status === 403, "Rol DIRECTIVOS tiene bloqueada la creación de producciones (403 Forbidden)");

    } catch (err) {
        console.error("Error durante las pruebas:", err);
        testsFailed++;
    } finally {
        // ----------------------------------------------------
        // LIMPIEZA ROBUSTA Y GARANTIZADA DE REGISTROS DE PRUEBA
        // ----------------------------------------------------
        console.log("\n👉 Limpieza garantizada de datos de prueba...");
        try {
            const prodIds = Array.from(createdProduccionIds);
            const insumoIds = Array.from(createdInsumoIds);

            if (prodIds.length > 0) {
                await pool.query("DELETE FROM produccion_insumo WHERE produccion_id IN (?)", [prodIds]);
                await pool.query("DELETE FROM produccion WHERE id IN (?)", [prodIds]);
            }
            if (insumoIds.length > 0) {
                await pool.query("DELETE FROM produccion_insumo WHERE insumo_id IN (?)", [insumoIds]);
                await pool.query("DELETE FROM precio WHERE insumo_id IN (?)", [insumoIds]);
                await pool.query("DELETE FROM receta_insumo WHERE insumo_id IN (?)", [insumoIds]);
                await pool.query("DELETE FROM insumo WHERE id IN (?)", [insumoIds]);
            }
            console.log(`  🧹 Limpieza completada: ${prodIds.length} producciones y ${insumoIds.length} insumos de prueba purgados.`);
        } catch (cleanupErr) {
            console.error("  ⚠️ Error durante la limpieza de datos de prueba:", cleanupErr);
        }
    }

    console.log("\n==========================================================");
    console.log(`   RESUMEN FINAL DE PRUEBAS: ${testsPassed} PASADAS | ${testsFailed} FALLIDAS`);
    console.log("==========================================================");

    process.exit(testsFailed > 0 ? 1 : 0);
}

runTestSuite();
