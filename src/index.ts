import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { usuarioRoutes } from "./routes/usuario.routes";
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());

app.use("/", usuarioRoutes());

app.listen(process.env.PORT, () => {
    console.log("API está rodando!");
});



