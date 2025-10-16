import { pgTable, serial, varchar, pgEnum, integer, timestamp } from "drizzle-orm/pg-core";
import { estacionamentos } from "./estacionamentos";

export const vagasStatusEnum = pgEnum("vagas_status", ["livre", "ocupada", "bloqueada"]);
export const tiposEnum = pgEnum("tipo", ["carro", "moto", "deficiente"]);

export const vagas = pgTable("vagas", {
  id: serial("id").primaryKey(),
  numero: varchar("numero", { length: 50 }).notNull(), 
  status: vagasStatusEnum("status").default("livre").notNull(),
  tipo: tiposEnum("tipo"),
  estacionamento_id: integer("estacionamento_id").notNull().references(() => estacionamentos.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});
