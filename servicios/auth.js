import argon2 from "argon2";
import { findUsuarioByDNI, insertUsuario } from "../models/usuario.js";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "comedor_secret_access_123";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "comedor_secret_refresh_123";

//Hasheo de password
export const hashearPassword = async pass => {
    try{
        const hash = await argon2.hash(pass, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,    //Costo de memoria(64mb)
            timeCost: 3,    //Número de iteraciones
            parallelism: 1 //Cantidad de hilos
        });
        return hash;
    }catch(error){
        console.error(error);
    }
}

//Verificar password
export const verificarPassword = async (hash, pass) => {
    try{
        return await argon2.verify(hash, pass);
    }catch(error){
        console.error(error);
        return false;
    }
};

//Generar token
export const generateAccessToken = usuario => {
    return jwt.sign({id: usuario.id, dni: usuario.dni}, ACCESS_TOKEN_SECRET, {expiresIn: '15m'});
};

//Renovamos token
export const refreshAccessToken = usuario => {
    return jwt.sign({id: usuario.id, dni: usuario.dni}, REFRESH_TOKEN_SECRET, {expiresIn: '7d'});
};

//Creamos el usuario
export const registerUser = async (rol_id, nombre, apellido, dni, cuil, telefono, password) => {
    try{
        const passHasheada = await hashearPassword(password);
        const resultado = await insertUsuario(rol_id, nombre, apellido, dni, cuil, telefono, passHasheada);
        return resultado;
    }catch(error){
        throw error;
    }
}

export const login = async (dni, password) => {
    const usuario = await findUsuarioByDNI(dni);
    if(!usuario){
        throw json({error: "Usuario no encontrado"});
    }
    const passValida = await verificarPassword(usuario[0].password, password);
    if(!passValida){
        throw json({error: "Password incorrecta"});
    }
    const access_token = generateAccessToken(usuario);
    const refresh_token = refreshAccessToken(usuario);
    return {access_token, refresh_token};    
}