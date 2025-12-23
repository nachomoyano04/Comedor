import argon2 from "argon2";
import jwt from "jsonwebtoken";
import { findUsuarioByDNI, getPasswordByDNI, insertUsuario } from "../models/usuario.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "comedor_secret_access_123456";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "comedor_secret_refresh_654321";

//Hasheo de password
export const hashearPassword = async pass => {
    try {
        const hash = await argon2.hash(pass, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,    //Costo de memoria(64mb)
            timeCost: 3,    //Número de iteraciones
            parallelism: 1 //Cantidad de hilos
        });
        return hash;
    } catch (error) {
        console.error(error);
    }
}

//Verificar password
export const verificarPassword = async (hash, pass) => {
    try {
        return await argon2.verify(hash, pass);
    } catch (error) {
        console.error(error);
        return false;
    }
};

//Generar token
export const generateAccessToken = usuario => {
    console.log(usuario);
    const roles = usuario.map(u => u.numero_rol);
    return jwt.sign({
        id: usuario[0].id,
        nombre: usuario[0].nombre,
        apellido: usuario[0].apellido,
        dni: usuario[0].dni,
        roles
    }, ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
};

//Renovamos token
export const refreshAccessToken = usuario => {
    const roles = usuario.map(u => u.numero_rol);
    return jwt.sign({
        id: usuario[0].id,
        nombre: usuario[0].nombre,
        apellido: usuario[0].apellido,
        dni: usuario[0].dni,
        roles
    }, REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
};

//Verificar refresh_token
export const validateRefreshToken = token => {
    try {
        return jwt.verify(token, REFRESH_TOKEN_SECRET);
    } catch (error) {
        return null;
    }
}

//Creamos el usuario
export const registerUser = async (rol_id, nombre, apellido, dni, cuil, telefono, password) => {
    try {
        const passHasheada = await hashearPassword(password);
        const resultado = await insertUsuario(rol_id, nombre, apellido, dni, cuil, telefono, passHasheada);
        return resultado;
    } catch (error) {
        throw error;
    }
}

export const login = async (dni, password) => {
    const usuario = await findUsuarioByDNI(dni);
    if (usuario.length == 0) {
        return ({ error: "Dni y/o contraseña incorrectos" });
    }
    if (usuario[0].estado == 0) {
        return ({ error: "Su cuenta esta desactivada, pedir activación al Admin" });
    }
    const passwordUser = await getPasswordByDNI(dni);
    const coinciden = await verificarPassword(passwordUser.password, password);
    if (!coinciden) {
        return ({ error: "Dni y/o contraseña incorrectos" });
    }
    const access_token = generateAccessToken(usuario);
    const refresh_token = refreshAccessToken(usuario);
    return { access_token, refresh_token, nombre: usuario[0].nombre };
}