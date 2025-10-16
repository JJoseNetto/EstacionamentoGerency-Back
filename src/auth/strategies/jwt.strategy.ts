import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: (req: Request) => {
        // Método mais robusto para extrair o token
        if (req && req.cookies) {
          return req.cookies['access_token'];
        }
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'meuSecretoSuperSecreto123',
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.sub, 
      email: payload.email,
      nome: payload.nome,
      role: payload.role,
    };
  }
}