export const roleMiddleware = role => {
    return (req, res, next) => {
        const userRoles = req.user.roles;
        if(userRoles.includes(role)){
            next();
        }else{
            res.status(403);
        }
    }
}