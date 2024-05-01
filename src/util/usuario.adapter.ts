import { Usuario, Prisma } from "@prisma/client";
import { Usuario as UsuarioBackend } from "../models/usuario.model";


export function adaptUsuarioPrisma(usuario: Usuario): UsuarioBackend {
    const novoUsuario = new UsuarioBackend(
        usuario.nome,
        usuario.email,
        usuario.senha
    );
    novoUsuario.id = usuario.id;

    return novoUsuario;

}