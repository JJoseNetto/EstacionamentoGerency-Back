import { Injectable } from "@nestjs/common";
import { EstacionamentosRepository } from "./estacionamentos.repository";
import { AddEstacionamentosDto } from "./dto/add-estacionamentos.dto";
import { CurrentUserDto } from "src/auth/dto/current-user.dto";
import { customAlphabet } from "nanoid";

@Injectable()
export class EstacionamentosService{
    constructor(private readonly estacionamentosRepository: EstacionamentosRepository){}

    async create(addEstacionamentosDto: AddEstacionamentosDto, user: CurrentUserDto){
        const generateCodigo = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 6);
        const codigo = generateCodigo();

        return this.estacionamentosRepository.create(addEstacionamentosDto, codigo, user.id);
    }


    async update(id: number, data: Partial<AddEstacionamentosDto>) {
        return this.estacionamentosRepository.update(id, data);
    }

    async getAll(user: CurrentUserDto){
        return this.estacionamentosRepository.getAllByUser(user.id);
    }

    async remove(id: number){
        return this.estacionamentosRepository.remove(id);
    }
}