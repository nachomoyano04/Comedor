import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if(!token){
        return res.status(401).json("No hay token");
    }
    const secret = process.env.ACCESS_TOKEN_SECRET || "redacted_placeholder_secret";
    jwt.verify(token, secret, (err, user) => {
        if(err){
            return res.status(401).json("token invalido");
        }
        req.user = user;
        next();
    })
}