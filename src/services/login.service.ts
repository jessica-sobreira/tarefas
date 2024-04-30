import { Result } from "../contract/result.contract";
import repository from "../database/prisma.repository";
import { validarLoginDTO } from "../contract/login.contract";
import jwt from 'jsonwebtoken';

export class LoginService {
    public async login(email: string, senha: string): Promise<Result> {
        const usuario = await repository.usuario.findFirst({
            where: {
                email,
                senha
            },
            select: {
                id: true,
                nome: true
            }
        })

        if(!usuario) {
            return {
                ok: false,
                message: "Credenciais inválidas",
                code: 401,
            }
    
        }

        const token = this.generateToken(usuario)




        return {
            ok: true,
            message: "Login realizado com sucesso!",
            code: 200,
            data: {
                id: usuario.id,
                nome: usuario.nome,
                token
            } 
        }
    } 

    public async validarLogin(token: string, idUsuario: string): Promise<Result> {

        const payload = this.validarToken(token) as validarLoginDTO

        if(payload == null || idUsuario != payload.id) {
            return {
                ok: false,
                message: "Token de autenticação inválido",
                code: 401
            }
            
        }

        return {
            ok: true,
            message: "Validação de login feita com sucesso!",
            code: 200
        }

    }

    public generateToken(payload: any) {
        const token = jwt.sign(payload, process.env.JWT_SECRET!) 
        return token

    }

    public validarToken(token: string) {
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET!)
            return payload 
        
        } catch(error: any) {
            return null
        }
    }


}