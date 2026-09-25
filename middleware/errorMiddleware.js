const errorMiddleware = (err, req, res, next) => {
    console.error(`[Error] ${req.method} ${req.url}:`, err);
    const status = err.status || err.statusCode || 500;
    const message = (process.env.NODE_ENV === "production" && status === 500)
        ? "Error interno del servidor"
        : (err.message || "Error interno del servidor");

    res.status(status).json({
        error: message,
        ...(process.env.NODE_ENV !== "production" && { stack: err.stack })
    });
};

export default errorMiddleware;
