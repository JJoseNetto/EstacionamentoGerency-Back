import { Injectable, ForbiddenException, NotFoundException, BadRequestException } from "@nestjs/common";
import { UsuariosEstacionamentosRepository } from "./usuarios-estacionamentos.repository";
import { CurrentUserDto } from "src/auth/dto/current-user.dto";
import { UsuariosEstacionamentosDto } from "./dto/usuarios-estacionamentos.dto";

@Injectable()
export class UsuariosEstacionamentosService {
  constructor(private usuariosEstacionamentosRepository: UsuariosEstacionamentosRepository) {}

  async associar(user: CurrentUserDto, userId: number, estacionamentoId: number) {
    const [estacionamento] = await this.usuariosEstacionamentosRepository.findEstacionamentoById(estacionamentoId);

    if (!estacionamento) {
      throw new NotFoundException("Estacionamento não encontrado");
    }
    
    if (estacionamento.admin_id !== user.id) {
      throw new ForbiddenException("Você não tem permissão para associar usuários neste estacionamento");
    }

    const jaAssociado = await this.usuariosEstacionamentosRepository.verificarUsuarioAssociado(userId, estacionamentoId);

    if (jaAssociado) {
      throw new BadRequestException("Usuário já está associado a este estacionamento");
    }

    return this.usuariosEstacionamentosRepository.associarUsuarioAoEstacionamento(userId, estacionamentoId);
  }

  async getUsuariosPorEstacionamento(estacionamentoId: number) {
    return this.usuariosEstacionamentosRepository.getUsuariosPorEstacionamento(estacionamentoId);
  }

  async remove(usuariosEstacionamentosDto: UsuariosEstacionamentosDto) {
    return this.usuariosEstacionamentosRepository.removerUsuarioDoEstacionamento(usuariosEstacionamentosDto);
  }

  async associarViaCode(user: CurrentUserDto, codigo: string){
    const [codigoValido] =  await this.usuariosEstacionamentosRepository.findByCode(codigo);
    if(!codigoValido){
      throw new BadRequestException('Codigo invalido!')
    }

     return this.usuariosEstacionamentosRepository.associarUsuarioAoEstacionamento(user.id, codigoValido.id);
  }
}
