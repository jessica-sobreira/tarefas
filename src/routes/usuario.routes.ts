import { Router } from "express";
import { UsuarioController } from "../controllers/usuario.controller";


export function usuarioRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const usuarioController = new UsuarioController();

    router.post("/usuario", usuarioController.criarUsuario);

    return router;
}
