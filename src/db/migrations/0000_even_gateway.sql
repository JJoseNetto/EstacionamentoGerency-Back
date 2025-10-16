CREATE TYPE "public"."role" AS ENUM('admin', 'user');--> statement-breakpoint
CREATE TYPE "public"."users_status" AS ENUM('ativo', 'inativo');--> statement-breakpoint
CREATE TYPE "public"."tipo" AS ENUM('carro', 'moto', 'deficiente');--> statement-breakpoint
CREATE TYPE "public"."vagas_status" AS ENUM('livre', 'ocupada', 'bloqueada');--> statement-breakpoint
CREATE TABLE "estacionamentos" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"codigo_convite" varchar,
	"admin_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"cpf" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" varchar(255) NOT NULL,
	"role" "role" DEFAULT 'user' NOT NULL,
	"status" "users_status" DEFAULT 'ativo' NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "usuarios_estacionamentos" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"estacionamento_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "historico_vagas" (
	"id" serial PRIMARY KEY NOT NULL,
	"vaga_id" integer NOT NULL,
	"status_anterior" varchar(20) NOT NULL,
	"status_novo" varchar(20) NOT NULL,
	"data_inicio" timestamp with time zone DEFAULT now() NOT NULL,
	"data_fim" timestamp with time zone,
	"duracao_minutos" integer
);
--> statement-breakpoint
CREATE TABLE "vagas" (
	"id" serial PRIMARY KEY NOT NULL,
	"numero" varchar(50) NOT NULL,
	"status" "vagas_status" DEFAULT 'livre' NOT NULL,
	"tipo" "tipo",
	"estacionamento_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "estacionamentos" ADD CONSTRAINT "estacionamentos_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuarios_estacionamentos" ADD CONSTRAINT "usuarios_estacionamentos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuarios_estacionamentos" ADD CONSTRAINT "usuarios_estacionamentos_estacionamento_id_estacionamentos_id_fk" FOREIGN KEY ("estacionamento_id") REFERENCES "public"."estacionamentos"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "historico_vagas" ADD CONSTRAINT "historico_vagas_vaga_id_vagas_id_fk" FOREIGN KEY ("vaga_id") REFERENCES "public"."vagas"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vagas" ADD CONSTRAINT "vagas_estacionamento_id_estacionamentos_id_fk" FOREIGN KEY ("estacionamento_id") REFERENCES "public"."estacionamentos"("id") ON DELETE no action ON UPDATE no action;