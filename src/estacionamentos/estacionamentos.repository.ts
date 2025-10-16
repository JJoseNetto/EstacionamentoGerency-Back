import { Injectable } from "@nestjs/common";
import { AddEstacionamentosDto } from "./dto/add-estacionamentos.dto";
import { db } from "src/db/connection";
import { estacionamentos } from "src/db/schema/estacionamentos";
import { usuarios_estacionamentos } from "src/db/schema/usuarios_estacionamentos";
import { eq, inArray } from "drizzle-orm";
import { vagas } from "src/db/schema/vagas";

@Injectable()
export class EstacionamentosRepository {
    async create(addEstacionamentosDto: AddEstacionamentosDto, codigoConvite ,adminId: number){
        return db.insert(estacionamentos).values({
            nome: addEstacionamentosDto.nome,
            endereco: addEstacionamentosDto.endereco,
            cidade: addEstacionamentosDto.cidade,
            estado: addEstacionamentosDto.estado,
            codigo_convite: codigoConvite,
            admin_id: adminId
        }).returning();
    }

    async update(id: number, data: Partial<AddEstacionamentosDto>) {
        return db
            .update(estacionamentos)
            .set({
                nome: data.nome,
                endereco: data.endereco,
                cidade: data.cidade,
                estado: data.estado
            })
            .where(eq(estacionamentos.id, id))
            .returning();
    }

    async getAllByUser(userId: number) {
        const admin = await this.getEstacionamentosAdmin(userId);
        const vinculados = await this.getEstacionamentosVinculados(userId);

        const unicos = this.removeDuplicados([...admin, ...vinculados]);

        return await this.adicionarVagas(unicos);
    }

    private async getEstacionamentosAdmin(userId: number) {
        return db.select().from(estacionamentos).where(eq(estacionamentos.admin_id, userId));
    }

    private async getEstacionamentosVinculados(userId: number) {
        const vinculos = await db
            .select({ estacionamento_id: usuarios_estacionamentos.estacionamento_id })
            .from(usuarios_estacionamentos)
            .where(eq(usuarios_estacionamentos.user_id, userId));

        if (!vinculos.length) return [];

        return db
            .select()
            .from(estacionamentos)
            .where(inArray(estacionamentos.id, vinculos.map(v => v.estacionamento_id)));
    }

    private removeDuplicados(estacionamentos: any[]) {
        return estacionamentos.filter(
            (v, i, a) => a.findIndex(t => t.id === v.id) === i
        );
    }

    private async adicionarVagas(estacionamentos: any[]) {
        return Promise.all(
            estacionamentos.map(async (e) => {
            const vagasDoEstacionamento = await db
                .select({ id: vagas.id, status: vagas.status })
                .from(vagas)
                .where(eq(vagas.estacionamento_id, e.id));

            const totalVagas = vagasDoEstacionamento.length;
            const vagasDisponiveis = vagasDoEstacionamento.filter(v => v.status === 'livre').length;

            return { ...e, totalVagas, vagasDisponiveis };
            })
        );
    }

    async remove(id: number){
        return db.delete(estacionamentos).where(eq(estacionamentos.id, id));
    }
}