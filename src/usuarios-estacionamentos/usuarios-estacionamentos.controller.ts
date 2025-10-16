import { Controller, Post, Body, UseGuards, Get, Param, Delete, ParseIntPipe } from "@nestjs/common";
import { UsuariosEstacionamentosService } from "./usuarios-estacionamentos.service";
import { CurrentUser } from "src/auth/decorators/current-user.decorator";
import { CurrentUserDto } from "src/auth/dto/current-user.dto";
import { UsuariosEstacionamentosDto } from "./dto/usuarios-estacionamentos.dto";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/auth/guards/roles.guard";
import { Roles } from "src/auth/decorators/roles.decorator";

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller("usuarios-estacionamentos")
export class UsuariosEstacionamentosController {
  constructor(private service: UsuariosEstacionamentosService) {}

  @Post("associar")
  @Roles('admin')
  async associar(@Body() usuariosEstacionamentosDto: UsuariosEstacionamentosDto, @CurrentUser() user: CurrentUserDto) {
    return this.service.associar(user, usuariosEstacionamentosDto.userId, usuariosEstacionamentosDto.estacionamentoId);
  }

  @Get("estacionamento/:id")
  @Roles('admin')
  async getUsuariosPorEstacionamento(@Param("id") estacionamentoId: number) {
    return this.service.getUsuariosPorEstacionamento(Number(estacionamentoId));
  }

  
  @Delete('')
  @Roles('admin')
  remove(@Body() usuariosEstacionamentosDto: UsuariosEstacionamentosDto){
    return this.service.remove(usuariosEstacionamentosDto);
  }
  
  @Post('associarViaCode')
  async associarViaCode(@Body() code: any, @CurrentUser() user: CurrentUserDto){
    return this.service.associarViaCode(user, code.codigo);
  }
}
