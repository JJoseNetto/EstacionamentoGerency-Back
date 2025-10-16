import { Injectable } from "@nestjs/common";
import { db } from "src/db/connection";
import { users } from "../db/schema/users";
import { CreateUserDto } from "./dto/create-user.dto";
import { eq} from "drizzle-orm";

@Injectable()
export class UsersRepository {
    async create(createUserDto: CreateUserDto, hashedPassword: string) {
        return db.insert(users).values({
            nome: createUserDto.nome,
            email: createUserDto.email,
            cpf: createUserDto.cpf,
            password_hash: hashedPassword,
        }).returning({
            id: users.id,
            email: users.email,
            nome: users.nome,
            cpf: users.cpf,
            createdAt: users.created_at,
        });
    }

    async findAll() {
        return db.select({
            id: users.id,
            nome: users.nome,
        }).from(users);
    }

    async findByEmail(email: string) {
        return db.select({
            id: users.id,
            nome: users.nome,
            email: users.email,
            cpf: users.cpf,
            password: users.password_hash,
            role: users.role,
            status: users.status,
            created_at: users.created_at,
            updated_at: users.updated_at,
        })
            .from(users)
            .where(eq(users.email, email))
            .limit(1);
    }

    async findByCpf(cpf: string) {
        return db.select().from(users).where(eq(users.cpf, cpf)).limit(1);
    }

    async findOne(id: number) {
        return db.select({
            id: users.id,
            nome: users.nome,
            cpf: users.cpf,
            email: users.email,
            status: users.status,
            role: users.role,
        })
            .from(users)
            .where(eq(users.id, id)).limit(1);
    }

}