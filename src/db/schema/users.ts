import { pgTable, serial, varchar, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userStatusEnum = pgEnum("users_status", ["ativo", "inativo"]);
export const userRoleEnum = pgEnum('role', ['admin', 'user']);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  nome: varchar("nome", { length: 255 }).notNull(),
  cpf: varchar("cpf", { length: 255 }).unique().notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password_hash: varchar("password_hash", { length: 255 }).notNull(),
  role: userRoleEnum("role").notNull().default('user'),
  status: userStatusEnum("status").default("ativo").notNull(),
  created_at: timestamp("created_at").defaultNow(),
  updated_at: timestamp("updated_at").defaultNow(),
});
