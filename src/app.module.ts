import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { VagasModule } from './vagas/vagas.module';
import { UsersModule } from './users/users.module';
import { EstacionamentosModule } from './estacionamentos/estacionamentos.module';
import { UsuariosEstacionamentosModule } from './usuarios-estacionamentos/usuarios-estacionamentos.module';

@Module({
  imports: [AuthModule,VagasModule,UsersModule,EstacionamentosModule,UsuariosEstacionamentosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
