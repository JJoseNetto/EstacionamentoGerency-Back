import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { VagasRepository } from "./vagas.repository";
import { AddVagasDto, Tipo } from "./dto/add-vagas.dto";
import { es } from "zod/v4/locales";

@Injectable()
export class VagasService {
    constructor(private readonly vagasRepository: VagasRepository) {}

    async create(addVagasDto: AddVagasDto){
        const numero = await this.generateNumero(addVagasDto.tipo, addVagasDto.estacionamentoId);

        return this.vagasRepository.create({
            numero,
            tipo: addVagasDto.tipo,
            estacionamentoId: addVagasDto.estacionamentoId,
        });
    }

    async update(id: number,  addVagasDto: AddVagasDto) {
        const vagaExistente: any = await this.findOne(id);

        let numeroDaVaga = vagaExistente.numero;
        if (vagaExistente.tipo !== addVagasDto.tipo) {
            numeroDaVaga = await this.generateNumero(addVagasDto.tipo, addVagasDto.estacionamentoId);
        }

        const result = await this.vagasRepository.update(id, addVagasDto, numeroDaVaga);
        return result[0];
    }

    private async generateNumero(tipo: Tipo, estacionamentoId: number): Promise<string> {
        const prefixMap = { carro: 'C', moto: 'M', deficiente: 'D' };
        const prefix = prefixMap[tipo];

        const vagasExistentes = await this.vagasRepository.findByTipoAndEstacionamento(
        tipo,
        estacionamentoId
        );

        const numerosExistentes = vagasExistentes.map(v => parseInt(v.numero.slice(1)));
        const nextNumber = numerosExistentes.length > 0 ? Math.max(...numerosExistentes) + 1 : 1;

        return `${prefix}${nextNumber}`;
    }

    async findAll(estacionamentoId: number) {
        return await this.vagasRepository.findAll(estacionamentoId);
    }

    async findOne(id: number) {
        const vaga = await this.vagasRepository.findOne(id);

        if (vaga.length === 0) {
        throw new NotFoundException('Vaga não encontrada');
        }

        return vaga[0];
    }
    
    async remove(id: number){
        await this.findOne(id);
        
        return this.vagasRepository.remove(id);
    }
}