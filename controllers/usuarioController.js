import { changeStateUser, findByDniOrCuil, findUsuarioByDNI, getUsuarios, getUsuariosByRol, insertUsuario, updatePassword, updateRol, updateUsuario } from "../models/usuario.js";
import { generateAccessToken, hashearPassword, login, validateRefreshToken, verificarPassword } from "../services/auth.js";
import { deleteRolesFromUser, getRolesByUser, insertUsuario_Rol } from "../models/roles.js";
import pool from "../config/database.js";

export const nuevoUsuario = async (req, res) => {
    const { nombre, apellido, dni, cuil, telefono, rol } = req.body;
    const usuario = { nombre, apellido, dni, cuil, telefono };
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        //Chequeamos de que no haya otro usuario con ese dni o cuil...
        const hayOtro = await findByDniOrCuil(dni, cuil);
        if (hayOtro.length > 0) {
            return res.status(500).json("Dni o cuil ya existentes");
        }
        usuario.estado = 1;
        usuario.password = await hashearPassword(usuario.dni);

        const resultado = await insertUsuario(usuario, connection);

        const idUsuario = resultado.insertId;
        for (const idRol of rol) {
            await insertUsuario_Rol({ usuario_id: idUsuario, rol_id: idRol }, connection);
        }
        await connection.commit();
        if (resultado.affectedRows > 0) {
            return res.json("Usuario registrado.");
        }
        return res.json("No se pudo registrar el usuario.");
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).json({ error: "Error al crear nuevo usuario" });
    } finally {
        connection.release();
    }
}

export const editarUsuario = async (req, res) => {
    const { id } = req.params
    const { nombre, apellido, dni, cuil, telefono, rol } = req.body;
    const connection = await pool.getConnection();
    try {
        await connection.beginTransaction();
        //Chequeamos de que no haya otro con ese dni o cuil
        const hayOtro = await findByDniOrCuil(dni, cuil, id);
        if (hayOtro.length > 0 && hayOtro[0].id != id) {
            return res.status(500).json("Dni o cuil ya existentes");
        }
        const resultado = await updateUsuario(nombre, apellido, dni, cuil, telefono, id, connection);
        if (rol.length > 0) {
            await deleteRolesFromUser(id, connection);
            for (const r of rol) {
                await insertUsuario_Rol({ usuario_id: id, rol_id: r }, connection);
            }
        }
        //Logica de que si cambia el dni y la password es su dni. Que tambien cambie la password...
        const dniIgualAPassword = await verificarPassword(hayOtro[0].password, hayOtro[0].dni);
        if(dniIgualAPassword){
            const pass = await hashearPassword(dni);
            await updatePassword(pass, id);
        }
        await connection.commit();
        if (resultado.affectedRows > 0) {
            return res.json("Usuario editado.");
        }
        return res.json("No se pudo editar el usuario.");
    } catch (error) {
        await connection.rollback();
        console.log(error);
        return res.status(500).json({ error: "Error al editar usuario" });
    } finally {
        connection.release()
    }
}

export const obtenerUsuarios = async (req, res) => {
    try {
        const resultado = await getUsuarios();
        return res.json(resultado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al obtener usuarios" });
    }
}

export const borrarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await changeStateUser(0, id);
        if (resultado.affectedRows > 0) {
            return res.json("Usuario dado de baja.")
        }
        return res.json("No se pudo dar de baja el usuario.");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al borrar usuario" });
    }
}

export const activarUsuario = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await changeStateUser(1, id);
        if (resultado.affectedRows > 0) {
            return res.json("Usuario dado de alta.")
        }
        return res.json("No se pudo dar de alta el usuario.");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al activar usuario" });
    }
}

export const nuevoRolAUsuario = async (req, res) => {
    const usuario_rol = req.body;
    try {
        const resultado = await insertUsuario_Rol(usuario_rol);
        if (resultado.affectedRows > 0) {
            return res.json("Rol asignado.");
        }
        return res.json("No se pudo asignar el rol.");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al asignar rol al usuario" });
    }
}

export const obtenerUsuariosPorRol = async (req, res) => {
    const { rol_id } = req.params;
    try {
        const resultado = await getUsuariosByRol(rol_id);
        return res.json(resultado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al obtener usuarios" });
    }
}

export const buscarUsuarioPorDni = async (req, res) => {
    const { dni } = req.params;
    try {
        const resultado = await findUsuarioByDNI(dni);
        return res.json(resultado);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al obtener usuario" });
    }
}

export const cambiarRol = async (req, res) => {
    const { rol_id, id } = req.params;
    try {
        const resultado = await updateRol(rol_id, id);
        if (resultado.affectedRows > 0) {
            return res.json("Rol de usuario cambiado.");
        }
        return res.json("No se pudo cambiar el rol del usuario");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al cambiar rol de usuario" });
    }
}

export const cambiarPassword = async (req, res) => {
    const { id } = req.params;
    const { password } = req.body;
    try {
        const pass = await hashearPassword(password);
        const resultado = await updatePassword(pass, id);
        if (resultado.affectedRows > 0) {
            return res.json("Password cambiada.");
        }
        return res.json("No se pudo cambiar la password");
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al actualizar password" });
    }
}

export const loginUsuario = async (req, res) => {
    const { dni, password } = req.body;
    try {
        const tokens = await login(dni, password);
        if ("error" in tokens) {
            return res.status(401).json("dni y/o password incorrecto");
        }
        const { access_token, refresh_token, nombre } = tokens;
        //Guardamos el token para las peticiones 401 en una cookie segura en el backend...
        res.cookie("refresh_token", refresh_token, {
            httpOnly: true,
            secure: false, //EN PRODUCCION -> true
            sameSite: "strict",
            path: "/usuario/auth",
            maxAge: 7 * 24 * 60 * 60 * 1000 //En 7 días
        })
        return res.json({ access_token, mensaje: `Bienvenido ${nombre ? nombre : ""}` });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al loguearse" });
    }
}

export const renovar_token = async (req, res) => {
    try {
        const refreshToken = req.cookies.refresh_token;
        if (!refreshToken) {
            return res.status(401).json({ error: "No hay refresh token" });
        }

        const payload = validateRefreshToken(refreshToken);
        if (!payload) {
            return res.status(401).json({ error: "Refresh token inválido" });
        }

        const usuario = await findUsuarioByDNI(payload.dni);
        if (usuario.length == 0) {
            return res.status(401).json({ error: "Usuario no encontrado" });
        }

        const nuevo_access_token = generateAccessToken(usuario[0]);
        return res.json({ access_token: nuevo_access_token });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al renovar token" });
    }
}

export const eliminar_token_refresh = (req, res) => {
    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: false, //EN PRODUCCION -> true
        sameSite: "strict",
        path: "/usuario/auth"
    })
    res.sendStatus(204);
}