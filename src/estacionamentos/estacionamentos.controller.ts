import { Body, Controller, Get, Post, UseGuards, Param, Delete, ParseIntPipe, Put } from "@nestjs/common";
import { EstacionamentosService } from "./estacionamentos.service";
import { AddEstacionamentosDto } from "./dto/add-estacionamentos.dto";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { CurrentUserDto } from "src/auth/dto/current-user.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('estacionamentos')
export class EstacionamentosController {
    constructor(private readonly estacionamentosService: EstacionamentosService) { }

    @Post('')
    @Roles('admin')
    create(@Body() addEstacionamentosDto: AddEstacionamentosDto, @CurrentUser() user: CurrentUserDto){
        return this.estacionamentosService.create(addEstacionamentosDto, user);
    }

    @Put(":id")
    async update(@Param("id") id: string, @Body() data: Partial<AddEstacionamentosDto>) {
        const estacionamentoId = Number(id);
        return this.estacionamentosService.update(estacionamentoId, data);
    }


    @Get('')
    @Roles('admin', 'user')
    getAll(@CurrentUser() user: CurrentUserDto){
        return this.estacionamentosService.getAll(user);
    }

    @Delete(':id')
    @Roles('admin')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.estacionamentosService.remove(id);
    }

}