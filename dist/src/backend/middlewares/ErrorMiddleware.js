"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class errorMiddleware {
}
exports.default = errorMiddleware;
errorMiddleware.validate = (err, _req, res) => {
    if (err.isJoi) {
        return res.status(400).json({
            message: err.details[0].message,
        });
    }
    return res.status(400).json({
        message: 'Invalid fields',
    });
};
//# sourceMappingURL=ErrorMiddleware.js.map