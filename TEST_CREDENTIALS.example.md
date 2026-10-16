# Plantilla de Credenciales de Prueba (Entorno de Desarrollo)

Este documento describe la estructura de credenciales sintéticas para pruebas locales automatizadas y manuales sobre la base de datos poblada con `database/comedor_seed_dev.sql`.

> [!WARNING]
> NUNCA utilice estas credenciales en entornos de producción ni asigne claves reales en archivos versionados.

## Estructura de Usuarios de Prueba Sintéticos

| Rol | DNI Sintético | Correo Ficticio | Contraseña de Prueba |
| :--- | :--- | :--- | :--- |
| **Administrador** | `44480378` | `admin@example.com` | *Definida en `.test-credentials.local.md`* |
| **Cocina** | `10000002` | `cocina@example.com` | *Definida en `.test-credentials.local.md`* |
| **Directivo** | `10000003` | `directivo@example.com` | *Definida en `.test-credentials.local.md`* |
| **Comprador** | `10000004` | `compras@example.com` | *Definida en `.test-credentials.local.md`* |

## Instrucciones de Uso
1. Copie este archivo a `.test-credentials.local.md` (ignorado por Git).
2. Para desarrollo local, la contraseña estándar de las pruebas automatizadas coincide con el DNI del usuario de prueba.
3. No despliegue el archivo `comedor_seed_dev.sql` en producción.
