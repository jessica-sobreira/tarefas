import cors from "cors";
import express from "express";
import { usuarioRoutes } from "../routes/usuario.routes";

export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    app.use("/usuario", usuarioRoutes());

    // app.use("/tarefas", tarefasRoutes());
    // app.use("/login", loginRoutes());

    return app;
}