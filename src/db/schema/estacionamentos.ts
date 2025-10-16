import { pgTable, serial, varchar, timestamp, integer, pgEnum } from "drizzle-orm/pg-core";
import { users } from "./users";

export const estacionamentos = pgTable("estacionamentos", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  endereco: varchar("endereco", { length: 255 }).notNull(),
  cidade: varchar("cidade", { length: 255 }).notNull(),
  estado: varchar("estado", { length: 255 }).notNull(),
  codigo_convite: varchar("codigo_convite"),
  admin_id: integer("admin_id").notNull().references(() => users.id),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
