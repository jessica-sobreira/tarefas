import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { usuarioRoutes } from "./routes/usuario.routes";
import { loginRoutes } from "./routes/login.routes";
import { tarefaRoutes } from "./routes/tarefa.routes";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

app.use("/", usuarioRoutes());
app.use("/", loginRoutes());
app.use("/", tarefaRoutes());

app.listen(process.env.PORT, () => {
    console.log("API está rodando!");
});



