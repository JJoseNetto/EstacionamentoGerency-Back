import { Module } from '@nestjs/common';
import { UsuariosEstacionamentosController } from './usuarios-estacionamentos.controller';
import { UsuariosEstacionamentosService } from './usuarios-estacionamentos.service';
import { UsuariosEstacionamentosRepository } from './usuarios-estacionamentos.repository';

@Module({
  controllers: [UsuariosEstacionamentosController],
  providers: [UsuariosEstacionamentosService, UsuariosEstacionamentosRepository],
  exports: [UsuariosEstacionamentosService, UsuariosEstacionamentosRepository],
})
export class UsuariosEstacionamentosModule {}
