import { Result } from "../contract/result.contract";
import { CriarUsuarioDTO } from "../contract/usuario.contract";
import repository from "../database/prisma.repository";
import { Usuario } from "../models/usuario.model";

export class UsuarioService {
    public async criar(data: CriarUsuarioDTO): Promise<Result> {
        const resultadoValidacao = this.validarCriar(data);

        if(!resultadoValidacao.ok) {
            return resultadoValidacao;
    }

    const usuario = new Usuario(data.nome, data.email, data.senha);

    const result = await repository.usuario.create({
        data: usuario
});

    return {
        ok: true,
        message: "Usuário criado com sucesso!",
        code: 201,
        data: result
        };
    }

    private validarCriar(data: CriarUsuarioDTO): Result {
        if(data.nome.length < 3) {
            return {
                ok: false,
                message: "Nome deve ter pelo menos 3 caracteres.",
                code: 400
            };
        }

        if(!data.email.includes("@")) {
            return {
                ok: false,
                message: "Email inválido.",
                code: 400
            };
        }

        if(data.senha.length < 4) {
            return {
                ok: false,
                message: "Senha deve ter pelo menos 4 caracteres.",
                code: 400
            };
        }
    
        return {
            ok: true,
            message: "Validação concluída com sucesso.",
            code: 200
        }
    }
}
