import { Request, Response } from "express";
import { UsuarioService } from "../services/usuario.service";

export class UsuarioController {
    public async criarUsuario(req: Request, res: Response) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).send({
                    ok: false,
                    message: "Campos obrigatórios não informados."
                });
            }

            const usuarioService = new UsuarioService();

            const result = await usuarioService.criar({
                nome,
                email,
                senha,
            });

            return res.status(201).send(result);
        } catch (error: any) {
            return res.status(500).send({
                ok: false,
                message: error.toString(),
            });
        }
    }
}
