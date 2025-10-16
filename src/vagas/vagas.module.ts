import { Module } from '@nestjs/common';
import { VagasController } from './vagas.controller';
import { VagasRepository } from './vagas.repository';
import { VagasService } from './vagas.service';

@Module({
  controllers: [VagasController],
  providers: [VagasService, VagasRepository],
  exports: [VagasService, VagasRepository],
})
export class VagasModule {}
