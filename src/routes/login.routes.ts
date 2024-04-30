import { Router } from "express";
import { LoginController } from "../controllers/login.controller";


export function loginRoutes(){
    const router = Router({
        mergeParams: true,
    });

    const loginController = new LoginController();

    router.post("/login", loginController.login);

    return router;
}
