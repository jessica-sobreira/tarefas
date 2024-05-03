import cors from "cors";
import express from "express";
import { usuarioRoutes } from "../routes/usuario.routes";
import { loginRoutes } from "../routes/login.routes";
import { tarefasRoutes } from "../routes/tarefa.routes";

export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/usuario", usuarioRoutes());
    app.use("/login", loginRoutes());
    app.use("/tarefas", tarefasRoutes());

    return app;
}
