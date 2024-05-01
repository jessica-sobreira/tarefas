import { Router } from "express";
import { TarefaController } from "../controllers/tarefa.controller";


export function tarefaRoutes() {
    const router = Router({
        mergeParams: true,
    });

    const tarefaController = new TarefaController();

    router.post("/usuario/:id/tarefa", tarefaController.criarTarefa);
    router.get("/usuario/:id/tarefa", tarefaController.listarTarefas);
    router.put("/usuario/:id/tarefa/:idtarefa", tarefaController.atualizarTarefa);
    router.delete("/usuario/:id/tarefa/:idtarefa", tarefaController.excluirTarefa);

    return router;

}