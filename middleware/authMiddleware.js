import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json({ error: "No hay token" });
    }
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        return res.status(500).json({ error: "Configuración de seguridad incompleta en el servidor" });
    }

    jwt.verify(token, secret, { algorithms: ["HS256"] }, (err, user) => {
        if(err){
            return res.status(401).json({ error: "Token inválido o expirado" });
        }
        req.user = user;
        next();
    });
};