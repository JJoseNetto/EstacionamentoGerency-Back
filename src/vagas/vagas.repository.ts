import { Injectable } from "@nestjs/common";
import { AddVagasDto, Status, Tipo } from "./dto/add-vagas.dto";
import { db } from "src/db/connection";
import { vagas } from "src/db/schema/vagas";
import { and, eq } from "drizzle-orm";

@Injectable()
export class VagasRepository {
    async create(vaga: AddVagasDto) {
        return db.insert(vagas).values({
            numero: vaga.numero,
            tipo: vaga.tipo,
            estacionamento_id: vaga.estacionamentoId,
        }).returning();
    }

    async update(id: number, updateVaga: AddVagasDto, numeroDaVaga: string) {
        return db.update(vagas).set({
            tipo: updateVaga.tipo,
            status: updateVaga.status,
            numero: numeroDaVaga,
        }).where(eq(vagas.id, id)).returning();
    }

    async findAll(estacionamentoId: number) {
        return db.select().from(vagas).where(eq(vagas.estacionamento_id, estacionamentoId)).orderBy(vagas.numero);
    }

    async findOne(id: number) {
        return db.select().from(vagas).where(eq(vagas.id, id));
    }

    async remove(id: number) {
        return db.delete(vagas).where(eq(vagas.id, id)).returning();
    }

    async findByTipoAndEstacionamento(tipo: Tipo, estacionamentoId: number) {
        return db.select().from(vagas).where(and(eq(vagas.tipo, tipo), eq(vagas.estacionamento_id, estacionamentoId)));
    }
}