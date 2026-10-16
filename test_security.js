import pool from "./config/database.js";
import { login } from "./services/auth.js";
import jwt from "jsonwebtoken";

const BASE_URL = "http://localhost:6970";

async function runSecurityTestSuite() {
    console.log("==========================================================");
    console.log("   BATERÍA DE PRUEBAS DE SEGURIDAD EXHAUSTIVA (SEC-TEST)");
    console.log("   SISTEMA DE COMEDOR ESCOLAR");
    console.log("==========================================================\n");

    let passed = 0;
    let failed = 0;

    const assert = (condition, desc) => {
        if (condition) {
            console.log(`  🛡️  [PASS] ${desc}`);
            passed++;
        } else {
            console.error(`  ❌ [FAIL] ${desc}`);
            failed++;
        }
    };

    const jwtSecret = process.env.ACCESS_TOKEN_SECRET || "redacted_placeholder_secret";
    const refreshSecret = process.env.REFRESH_TOKEN_SECRET || "redacted_placeholder_secret";

    try {
        // 1. Obtener tokens base
        const loginAdmin = await login("44480378", "44480378");
        const tokenAdmin = loginAdmin.access_token;

        const tokenCocina = jwt.sign({
            id: 888,
            nombre: "Cocina User",
            dni: "88888888",
            roles: [2] // COCINA
        }, jwtSecret, { algorithm: "HS256", expiresIn: '1h' });

        const tokenDirectivo = jwt.sign({
            id: 777,
            nombre: "Directivo User",
            dni: "77777777",
            roles: [3] // DIRECTIVOS
        }, jwtSecret, { algorithm: "HS256", expiresIn: '1h' });

        const tokenComprador = jwt.sign({
            id: 666,
            nombre: "Comprador User",
            dni: "66666666",
            roles: [4] // COMPRADOR
        }, jwtSecret, { algorithm: "HS256", expiresIn: '1h' });

        // ----------------------------------------------------
        // SECCIÓN 1: VECTORES DE ATAQUE A TOKENS JWT
        // ----------------------------------------------------
        console.log("👉 1. Verificación de Integridad de Tokens JWT...");

        // 1.1 Token Malformado (no estructurado en 3 partes)
        const resMalformed = await fetch(`${BASE_URL}/insumos`, {
            headers: { Authorization: "Bearer texto_basura_no_es_un_jwt" }
        });
        assert(resMalformed.status === 401, "Token malformado rechazado con 401");

        // 1.2 Token con firma adulterada
        const tokenParts = tokenCocina.split(".");
        const tokenTampered = `${tokenParts[0]}.${tokenParts[1]}.firmaAdulteradaInvalida123`;
        const resTampered = await fetch(`${BASE_URL}/insumos`, {
            headers: { Authorization: `Bearer ${tokenTampered}` }
        });
        assert(resTampered.status === 401, "Token con firma adulterada rechazado con 401");

        // 1.3 Token Vencido (Expired Token)
        const tokenExpired = jwt.sign({
            id: 888,
            nombre: "Expirado",
            dni: "88888888",
            roles: [2]
        }, jwtSecret, { algorithm: "HS256", expiresIn: -10 });
        const resExpired = await fetch(`${BASE_URL}/insumos`, {
            headers: { Authorization: `Bearer ${tokenExpired}` }
        });
        assert(resExpired.status === 401, "Token vencido rechazado con 401");

        // 1.4 Token firmado con secreto erróneo
        const tokenWrongSecret = jwt.sign({
            id: 888,
            nombre: "Hacker Secret",
            dni: "88888888",
            roles: [1] // intenta escalar a admin
        }, "secreto_totalmente_distinto_e_invalido_xyz", { algorithm: "HS256", expiresIn: '1h' });
        const resWrongSecret = await fetch(`${BASE_URL}/usuario`, {
            headers: { Authorization: `Bearer ${tokenWrongSecret}` }
        });
        assert(resWrongSecret.status === 401, "Token firmado con secreto incorrecto rechazado con 401");

        // 1.5 Token con algoritmo "none" (Unsigned Token Attack)
        const headerNone = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
        const payloadNone = Buffer.from(JSON.stringify({ id: 1, roles: [1], dni: "44480378" })).toString("base64url");
        const tokenNone = `${headerNone}.${payloadNone}.`;
        const resNone = await fetch(`${BASE_URL}/usuario`, {
            headers: { Authorization: `Bearer ${tokenNone}` }
        });
        assert(resNone.status === 401, "Token con algoritmo 'none' rechazado con 401");

        // 1.6 Token con algoritmo no permitido (ej. HS512 cuando se exige HS256)
        const tokenDisallowedAlg = jwt.sign({
            id: 888,
            dni: "88888888",
            roles: [1]
        }, jwtSecret, { algorithm: "HS512", expiresIn: '1h' });
        const resDisallowedAlg = await fetch(`${BASE_URL}/usuario`, {
            headers: { Authorization: `Bearer ${tokenDisallowedAlg}` }
        });
        assert(resDisallowedAlg.status === 401, "Token con algoritmo no permitido (HS512) rechazado con 401");

        // ----------------------------------------------------
        // SECCIÓN 2: CONTROL DE ACCESO, RUTAS PRIVADAS Y RBAC
        // ----------------------------------------------------
        console.log("\n👉 2. Verificación de Autenticación y Autorización RBAC...");

        // 2.1 Petición sin cabecera Authorization a ruta privada
        const resNoAuth = await fetch(`${BASE_URL}/insumos`);
        assert(resNoAuth.status === 401, "Acceso a ruta privada sin autenticación rechazado con 401");

        // 2.2 Petición sin cabecera Authorization a usuarios
        const resNoAuthUsers = await fetch(`${BASE_URL}/usuario`);
        assert(resNoAuthUsers.status === 401, "Acceso a listado de usuarios sin autenticación rechazado con 401");

        // 2.3 Rol insuficiente: Cocina (rol 2) intentando crear usuario (requiere ADMIN)
        const resCocinaCrearUser = await fetch(`${BASE_URL}/usuario`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenCocina}` },
            body: JSON.stringify({ nombre: "Test", apellido: "Test", dni: "00000001", rol: [1] })
        });
        assert(resCocinaCrearUser.status === 403, "Rol Cocina bloqueado al intentar crear usuario (403 Forbidden)");

        // 2.4 Rol insuficiente: Directivos (rol 3) intentando borrar precio (requiere Admin/Comprador/Cocina)
        const resDirBorrarPrecio = await fetch(`${BASE_URL}/precio/1`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${tokenDirectivo}` }
        });
        assert(resDirBorrarPrecio.status === 403, "Rol Directivos bloqueado al intentar borrar precio (403 Forbidden)");

        // 2.5 Rol insuficiente: Comprador (rol 4) intentando crear roles en el sistema
        const resCompCrearRol = await fetch(`${BASE_URL}/roles`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenComprador}` },
            body: JSON.stringify({ numero_rol: 99, nombre_rol: "Rol Falso" })
        });
        assert(resCompCrearRol.status === 403, "Rol Comprador bloqueado al intentar crear roles (403 Forbidden)");

        // ----------------------------------------------------
        // SECCIÓN 3: CONTROL DE IDOR (INSECURE DIRECT OBJECT REFERENCE)
        // ----------------------------------------------------
        console.log("\n👉 3. Verificación de Controles Anti-IDOR (Escalada Horizontal)...");

        // 3.1 Usuario regular intentando consultar DNI ajeno
        const resIdorDni = await fetch(`${BASE_URL}/usuario/dni/44480378`, {
            headers: { Authorization: `Bearer ${tokenCocina}` }
        });
        assert(resIdorDni.status === 403, "Anti-IDOR: Usuario regular no puede consultar DNI de otra persona (403)");

        // 3.2 Usuario regular intentando editar perfil ajeno (PUT /usuario/:id)
        const resIdorEditar = await fetch(`${BASE_URL}/usuario/1`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenCocina}` },
            body: JSON.stringify({ nombre: "Hackeado", apellido: "User", dni: "44480378" })
        });
        assert(resIdorEditar.status === 403, "Anti-IDOR: Usuario regular no puede editar datos de otro usuario (403)");

        // 3.3 Usuario regular intentando cambiar contraseña de otro usuario (PATCH /usuario/pass/:id)
        const resIdorPass = await fetch(`${BASE_URL}/usuario/pass/1`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${tokenCocina}` },
            body: JSON.stringify({ actual: "123", nueva: "hackeada" })
        });
        assert(resIdorPass.status === 403, "Anti-IDOR: Usuario regular no puede cambiar contraseña ajena (403)");

        // 3.4 Auto-consulta legítima de DNI propio
        const resAutoDni = await fetch(`${BASE_URL}/usuario/dni/88888888`, {
            headers: { Authorization: `Bearer ${tokenCocina}` }
        });
        assert(resAutoDni.status === 200, "Consulta legítima de DNI propio permitida (200 OK)");

        // ----------------------------------------------------
        // SECCIÓN 4: PREVENCIÓN DE INYECCIONES SQL
        // ----------------------------------------------------
        console.log("\n👉 4. Verificación de Resistencia a Inyección SQL (SQLi)...");

        // 4.1 SQLi en parámetro de ruta (GET /insumos/id/:id)
        const resSqliParam = await fetch(`${BASE_URL}/insumos/id/1'%20OR%20'1'='1`, {
            headers: { Authorization: `Bearer ${tokenAdmin}` }
        });
        const dataSqliParam = await resSqliParam.json().catch(() => ({}));
        assert(
            !dataSqliParam.id && (!dataSqliParam.message || !dataSqliParam.message.includes("syntax")),
            "Inyección SQL en parámetro de ruta no altera la consulta ni filtra sintaxis"
        );

        // 4.2 SQLi en parámetro de DNI
        const resSqliDni = await fetch(`${BASE_URL}/usuario/dni/44480378'%20OR%20'1'='1`, {
            headers: { Authorization: `Bearer ${tokenAdmin}` }
        });
        const dataSqliDni = await resSqliDni.json().catch(() => ([]));
        assert(Array.isArray(dataSqliDni) && dataSqliDni.length === 0, "Inyección SQL en búsqueda por DNI tratada como literal (0 coincidencias)");

        // 4.3 SQLi en Body del endpoint de Login
        const resSqliLogin = await fetch(`${BASE_URL}/usuario/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dni: "' OR 1=1 --", password: "' OR 1=1 --" })
        });
        assert(resSqliLogin.status === 401, "Inyección SQL en endpoint de login rechazada con 401 (sin bypass de auth)");

        // ----------------------------------------------------
        // SECCIÓN 5: RENOVACIÓN DE SESIÓN Y REFRESH TOKENS
        // ----------------------------------------------------
        console.log("\n👉 5. Verificación de Renovación de Sesión (Refresh Tokens)...");

        // 5.1 Petición de renovación sin ningún refresh token
        const resRefreshVacio = await fetch(`${BASE_URL}/usuario/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({})
        });
        assert(resRefreshVacio.status === 401, "Renovación sin refresh token rechazada con 401");

        // 5.2 Petición de renovación con refresh token falso/manipulado
        const resRefreshFalso = await fetch(`${BASE_URL}/usuario/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: "refresh.falso.invalido" })
        });
        assert(resRefreshFalso.status === 401, "Renovación con refresh token falso rechazada con 401");

        // 5.3 Petición de renovación con refresh token vencido
        const refreshExpired = jwt.sign({
            id: 4,
            dni: "44480378",
            roles: [1]
        }, refreshSecret, { algorithm: "HS256", expiresIn: -60 });
        const resRefreshExpired = await fetch(`${BASE_URL}/usuario/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshExpired })
        });
        assert(resRefreshExpired.status === 401, "Renovación con refresh token vencido rechazada con 401");

        // 5.4 Petición de renovación legítima con usuario activo
        const refreshActivo = jwt.sign({
            id: 1,
            dni: "44480378",
            roles: [1]
        }, refreshSecret, { algorithm: "HS256", expiresIn: "30d" });
        const resRefreshActivo = await fetch(`${BASE_URL}/usuario/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token: refreshActivo })
        });
        const dataRefreshActivo = await resRefreshActivo.json();
        assert(
            resRefreshActivo.status === 200 && dataRefreshActivo.access_token,
            "Usuario activo puede renovar normalmente su token (200 OK con access_token)"
        );

        // 5.5 Petición de renovación rechazada para usuario desactivado (estado = 0)
        const dniInactivo = "99999998";
        await pool.query(
            "INSERT INTO usuario (nombre, apellido, dni, cuil, telefono, correo, password, estado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
            ["Inactivo", "Test", dniInactivo, "20-99999998-9", "555-9998", "inactivo@example.com", "hash", 0]
        );
        try {
            const refreshInactivo = jwt.sign({
                id: 999,
                dni: dniInactivo,
                roles: [2]
            }, refreshSecret, { algorithm: "HS256", expiresIn: "30d" });

            const resRefreshInactivo = await fetch(`${BASE_URL}/usuario/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh_token: refreshInactivo })
            });
            const dataRefreshInactivo = await resRefreshInactivo.json();
            assert(
                resRefreshInactivo.status === 403 && dataRefreshInactivo.error?.includes("desactivada"),
                "Usuario desactivado rechazado al intentar renovar token (403 Forbidden)"
            );
        } finally {
            await pool.query("DELETE FROM usuario WHERE dni = ?", [dniInactivo]);
        }

        // ----------------------------------------------------
        // SECCIÓN 6: PROTECCIÓN DE CAMPOS SENSIBLES Y POLÍTICAS HTTP
        // ----------------------------------------------------
        console.log("\n👉 6. Verificación de No-Exposición de Hashes y Cabeceras...");

        // 6.1 getUsuarios no contiene campo password
        const resUsersList = await fetch(`${BASE_URL}/usuario`, {
            headers: { Authorization: `Bearer ${tokenAdmin}` }
        });
        const usersList = await resUsersList.json();
        const tieneHashes = Array.isArray(usersList) && usersList.some(u => "password" in u);
        assert(!tieneHashes && usersList.length > 0, "Listado de usuarios no expone campo password");

        // 6.2 Cabeceras de seguridad
        const resHealth = await fetch(`${BASE_URL}/health`);
        assert(resHealth.headers.get("x-content-type-options") === "nosniff", "Cabecera X-Content-Type-Options: nosniff");
        assert(resHealth.headers.get("x-frame-options") === "DENY", "Cabecera X-Frame-Options: DENY");
        assert(!resHealth.headers.get("x-powered-by"), "Cabecera X-Powered-By no revelada");

        // 6.3 CORS para origen no autorizado
        const resCors = await fetch(`${BASE_URL}/health`, {
            headers: { Origin: "http://malicioso.com" }
        });
        assert(resCors.headers.get("access-control-allow-origin") !== "http://malicioso.com", "CORS bloquea origen no autorizado");

    } catch (err) {
        console.error("Error durante las pruebas de seguridad:", err);
        failed++;
    }

    console.log("\n==========================================================");
    console.log(`   RESUMEN PRUEBAS DE SEGURIDAD: ${passed} PASADAS | ${failed} FALLIDAS`);
    console.log("==========================================================");

    process.exit(failed > 0 ? 1 : 0);
}

runSecurityTestSuite();
