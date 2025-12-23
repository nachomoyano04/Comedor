export const roleMiddleware = (rolesPermitidos = []) => {
    return (req, res, next) => {
        const userRoles = req.user?.roles || [];
        if (rolesPermitidos.some(r => userRoles.includes(r))) {
            return next();
        }
        return res.status(403).json("No tiene permisos");
    }
}