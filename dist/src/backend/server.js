"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetupServer = void 0;
require("../utils/module-alias");
const core_1 = require("@overnightjs/core");
const express_1 = __importDefault(require("express"));
const todos_controller_1 = require("./controller/todos.controller");
const cors_1 = __importDefault(require("cors"));
const Todos_routes_1 = __importDefault(require("./router/Todos.routes"));
class SetupServer extends core_1.Server {
    constructor(port = process.env.PORT || 3001) {
        super();
        this.port = port;
    }
    init() {
        this.setupExpress();
        this.setupControllers();
    }
    setupExpress() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use(Todos_routes_1.default);
    }
    setupControllers() {
        const todosController = new todos_controller_1.TodosController();
        this.addControllers([todosController]);
    }
    getApp() {
        return this.app;
    }
    start() {
        this.app.listen(this.port, () => {
            console.info('Server listening on port: ' + this.port);
        });
    }
}
exports.SetupServer = SetupServer;
//# sourceMappingURL=server.js.map