import { Body, Controller, Post, Param, Put, Get, ParseIntPipe, Delete } from "@nestjs/common";
import { VagasService } from "./vagas.service";
import { AddVagasDto } from "./dto/add-vagas.dto";

@Controller('vagas')
export class VagasController {
    constructor(private readonly vagasService: VagasService) { }

    @Post('')
    create(@Body() addVagasDto: AddVagasDto){
        console.log(addVagasDto);
        return this.vagasService.create(addVagasDto);
    }

    @Get(':id')
    findAll(@Param('id', ParseIntPipe) estacionamentoId: number){
        return this.vagasService.findAll(estacionamentoId);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() addVagasDto: AddVagasDto){
        return this.vagasService.update(id, addVagasDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.vagasService.remove(id);
    }
}