import { Request, Response } from "express";
import { camposNaoInformados, erroServidor } from "../util/response.helper";
import { LoginService } from "../services/login.service";
import { Result } from "../contract/result.contract";

export class LoginController {
    public async login(req: Request, res: Response) {
        try {
            const { email, senha } = req.body;

            if(!email || !senha){
                return camposNaoInformados(res);
            }

            const loginService = new LoginService()
            const result: Result = await loginService.login(email, senha)

            return res.status(Number(result.code)).send(result)

            }catch(error: any) {
            return erroServidor(res, error);
        }
    }
}

