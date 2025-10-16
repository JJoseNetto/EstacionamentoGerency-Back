import { pgTable, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { users } from "./users";
import { estacionamentos } from "./estacionamentos";

export const usuarios_estacionamentos = pgTable("usuarios_estacionamentos", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  estacionamento_id: integer("estacionamento_id").notNull().references(() => estacionamentos.id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow(),
});
