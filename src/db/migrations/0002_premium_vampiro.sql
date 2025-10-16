ALTER TABLE "historico_vagas" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "historico_vagas" CASCADE;--> statement-breakpoint
ALTER TABLE "usuarios_estacionamentos" DROP CONSTRAINT "usuarios_estacionamentos_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "usuarios_estacionamentos" DROP CONSTRAINT "usuarios_estacionamentos_estacionamento_id_estacionamentos_id_fk";
--> statement-breakpoint
ALTER TABLE "vagas" DROP CONSTRAINT "vagas_estacionamento_id_estacionamentos_id_fk";
--> statement-breakpoint
ALTER TABLE "vagas" ADD COLUMN "created_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "vagas" ADD COLUMN "updated_at" timestamp with time zone DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "usuarios_estacionamentos" ADD CONSTRAINT "usuarios_estacionamentos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "usuarios_estacionamentos" ADD CONSTRAINT "usuarios_estacionamentos_estacionamento_id_estacionamentos_id_fk" FOREIGN KEY ("estacionamento_id") REFERENCES "public"."estacionamentos"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "vagas" ADD CONSTRAINT "vagas_estacionamento_id_estacionamentos_id_fk" FOREIGN KEY ("estacionamento_id") REFERENCES "public"."estacionamentos"("id") ON DELETE cascade ON UPDATE no action;