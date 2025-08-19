import argon2 from "argon2";

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

export const verificarPassword = async (pass, hash) => {
    try{
        return await argon2.verify(hash, pass);
    }catch(error){
        console.error(error);
        return false;
    }
};

export const login = (req, res) => {
    const {dni, password} = req.body;
    
}