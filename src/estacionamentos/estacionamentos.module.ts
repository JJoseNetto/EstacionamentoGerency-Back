import { Module } from '@nestjs/common';
import { EstacionamentosService } from './estacionamentos.service';
import { EstacionamentosRepository } from './estacionamentos.repository';
import { EstacionamentosController } from './estacionamentos.controller';

@Module({
  controllers: [EstacionamentosController],
  providers: [EstacionamentosService, EstacionamentosRepository],
  exports: [EstacionamentosService, EstacionamentosRepository],
})
export class EstacionamentosModule {}
