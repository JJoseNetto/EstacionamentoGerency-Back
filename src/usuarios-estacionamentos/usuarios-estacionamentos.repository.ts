import { Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { db } from "src/db/connection";
import { estacionamentos } from "src/db/schema/estacionamentos";
import { users } from "src/db/schema/users";
import { usuarios_estacionamentos } from "src/db/schema/usuarios_estacionamentos";

@Injectable()
export class UsuariosEstacionamentosRepository {
  async associarUsuarioAoEstacionamento(userId: number, estacionamentoId: number) {
    return db.insert(usuarios_estacionamentos).values({
      user_id: userId,
      estacionamento_id: estacionamentoId,
    });
  }

  async findEstacionamentoById(estacionamentoId: number) {
    return db
      .select()
      .from(estacionamentos)
      .where(eq(estacionamentos.id, estacionamentoId)).limit(1);
  }

  async getUsuariosPorEstacionamento(estacionamentoId: number) {
    return db
      .select({
        id: users.id,
        nome: users.nome,
      })
      .from(usuarios_estacionamentos)
      .leftJoin(users, eq(users.id, usuarios_estacionamentos.user_id))
      .where(eq(usuarios_estacionamentos.estacionamento_id, estacionamentoId));
  }

  async verificarUsuarioAssociado(userId: number, estacionamentoId: number): Promise<boolean> {
    const [associacao] = await db
      .select()
      .from(usuarios_estacionamentos)
      .where(and(
        eq(usuarios_estacionamentos.user_id, userId),
        eq(usuarios_estacionamentos.estacionamento_id, estacionamentoId)
      ));
    return !!associacao;
  }

  async removerUsuarioDoEstacionamento(usuariosEstacionamentosDto) {
    return db
      .delete(usuarios_estacionamentos)
      .where(and(
        eq(usuarios_estacionamentos.user_id, usuariosEstacionamentosDto.userId),
        eq(usuarios_estacionamentos.estacionamento_id, usuariosEstacionamentosDto.estacionamentoId)
      ));
  }

  async findByCode(code: string){
      return db.select({
        id: estacionamentos.id
      }).from(estacionamentos).where(eq(estacionamentos.codigo_convite, code))
  }

}
