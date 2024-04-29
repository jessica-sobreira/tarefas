import { randomUUID } from "crypto";
import { Usuario } from "./usuario.model";


export class Tarefa {
    public id: string;

    constructor (
        public nome: string,
        public usuario: Usuario
    ) {
        this.id = randomUUID();
    }
}