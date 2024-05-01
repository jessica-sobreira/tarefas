import { Request, Response } from "express";
import { camposNaoInformados, erroServidor } from "../util/response.helper";
import { TarefaService } from "../services/tarefa.service";

const tarefaService = new TarefaService();

export class TarefaController {
    // POST http://localhost:3003/usuario/:id/tarefa
    public async criarTarefa(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { nome } = req.body;

            if (!nome) {
                return camposNaoInformados(res);
            }

            const tarefa = await tarefaService.criarTarefa(id, nome);

            return res.status(201).send({
                ok: true,
                message: "Tarefa criada com sucesso",
                data: tarefa,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    // GET http://localhost:3003/usuario/:id/tarefa
    public async listarTarefas(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const tarefas = await tarefaService.listarTarefas(id);

            return res.status(200).send({
                ok: true,
                message: "Tarefas listadas com sucesso",
                data: tarefas,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

    // PUT http://localhost:3003/usuario/:id/tarefa/:idtarefa
    public async atualizarTarefa(req: Request, res: Response) {
        try {
            const { id, idtarefa } = req.params;
            const { nome } = req.body;

            if (!nome) {
                return camposNaoInformados(res);
            }


            const tarefa = await tarefaService.atualizarTarefa(idtarefa, nome);

            return res.status(200).send({
                ok: true,
                message: "Tarefa atualizada com sucesso",
                data: tarefa,
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

     // DELETE http://localhost:3003/usuario/:id/tarefa/:idtarefa
     public async excluirTarefa(req: Request, res: Response) {
        try {
            const { idtarefa } = req.params;

            await tarefaService.excluirTarefa(idtarefa);

            return res.status(200).send({
                ok: true,
                message: "Tarefa excluída com sucesso",
            });
        } catch (error: any) {
            return erroServidor(res, error);
        }
    }

}