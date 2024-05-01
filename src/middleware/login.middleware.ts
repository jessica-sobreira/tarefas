import { NextFunction, Request, Response } from "express";
import { LoginService } from "../services/login.service";

export async function validaMiddlewareLogin (req: Request, res: Response, next: NextFunction) {

    try {

        const { authorization } = req.headers;
        const { id } = req.params

        if(!authorization) {
            return res.status(401).send({
                ok: false,
                message: "Token de autenticação não foi informado"
            })
        }

        const loginService = new LoginService()
        const result = await loginService.validarLogin(authorization, id)

        if(!result.ok) {
            return res.status(Number(result.code)).send(result)
        }

        next()
    
    } catch(error: any) {
        return res.status(500).send({
            ok: false, 
            message: error.toString(),
        })

    }

}