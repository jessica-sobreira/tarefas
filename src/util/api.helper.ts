import cors from "cors";
import express from "express";

export function createApp() {
    const app = express();
    app.use(express.json());
    app.use(cors());

    // app.use("/tarefas", tarefasRoutes());
    // app.use("/login", loginRoutes());

    return app;
}