import repository from "../database/prisma.repository";
import { Usuario } from "../models/usuario.model";
import { Tarefa } from "../models/tarefa.model";
import { adaptUsuarioPrisma } from "../util/usuario.adapter";


interface TarefaPrismaData {
    id: string;
    nome: string;
    idUsuario: string;
    
}

export class TarefaService {
    public async criarTarefa(idUsuario: string, nome: string): Promise<Tarefa> {
        try {
            if (!nome) {
                throw new Error("Campo obrigatório não informado.");
            }

            const usuario = await repository.usuario.findUnique({ where: { id: idUsuario } });
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }

            const usuarioBackend = adaptUsuarioPrisma(usuario);

            const tarefa = new Tarefa(nome, usuarioBackend);

            const result = await repository.tarefa.create({
                data: {
                    nome: tarefa.nome,
                    idUsuario: usuario.id,
                },
            });

                        
            const novaTarefa: Tarefa = {
                id: result.id,
                nome: result.nome,
                usuario: adaptUsuarioPrisma(usuario),
            };

            return novaTarefa;
        } catch (error: any) {
            throw new Error(`Erro ao criar tarefa: ${error.message}`);
        }
    }

    // Listar as tarefas de um usuário específico
    public async listarTarefas(idUsuario: string): Promise<Tarefa[]> {
        try {
            const usuario = await repository.usuario.findUnique({
                where: { id: idUsuario },
                include: { tarefa: true },
            });

            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }

            const tarefas: Tarefa[] = usuario.tarefa.map((tarefaPrisma: any) => {
                return {
                    id: tarefaPrisma.id,
                    nome: tarefaPrisma.nome,
                    usuario: adaptUsuarioPrisma(usuario),
                };
            });

            return tarefas;
        } catch (error: any) {
            throw new Error(`Erro ao listar tarefas: ${error.message}`);
        }
    }

    // Atualizar uma tarefa

    public async atualizarTarefa(idTarefa: string, nome?: string): Promise<Tarefa> {
        try {
            const tarefaExistente = await repository.tarefa.findUnique({
                where: { id: idTarefa },
            });
    
            if (!tarefaExistente) {
                throw new Error("Tarefa não encontrada.");
            }
    
            const updatedTarefa = await repository.tarefa.update({
                where: { id: idTarefa },
                data: {
                    nome
                },
            });
    
    
            // Obtém o usuário correspondente
            const usuario = await repository.usuario.findUnique({
                where: { id: updatedTarefa.idUsuario },
            });
    
            if (!usuario) {
                throw new Error("Usuário não encontrado.");
            }
    
            const usuarioAdaptado = adaptUsuarioPrisma(usuario);
    
            const tarefa: Tarefa = {
                id: updatedTarefa.id,
                nome: updatedTarefa.nome,
                usuario: usuarioAdaptado,
            };
    
            return tarefa;
        } catch (error: any) {
            throw new Error(`Erro ao atualizar tarefa: ${error.message}`);
        }
    }

    // Excluir uma tarefa
    public async excluirTarefa(idTarefa: string): Promise<void> {
        try {
            const tarefaExistente = await repository.tarefa.findUnique({
                where: { id: idTarefa },
            });

            if (!tarefaExistente) {
                throw new Error("Tarefa não encontrada.");
            }

            await repository.tarefa.delete({
                where: { id: idTarefa },
            });
        } catch (error: any) {
            throw new Error(`Erro ao excluir tarefa: ${error.message}`);
        }
    }

}