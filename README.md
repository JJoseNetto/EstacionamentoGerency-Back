<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Parkia - API de Estacionamentos (NestJS)

Este repositório contém uma API construída com NestJS e TypeScript para gerenciar estacionamentos, vagas e usuários. O projeto usa Drizzle ORM com Postgres e possui autenticação baseada em JWT + Passport.

Este README descreve como instalar, configurar e executar o projeto localmente (com e sem Docker), além de explicar as principais bibliotecas utilizadas e scripts disponíveis.

### Principais tecnologias

- Node.js + TypeScript
- NestJS (framework web)
- Drizzle ORM (drizzle-orm, drizzle-kit)
- Postgres (imagem Docker: postgres:17)
- passport / passport-jwt / passport-local (autenticação)
- @nestjs/jwt (emissão de tokens JWT)
- bcrypt (hash de senhas)
- dotenv / zod (carregamento e validação de variáveis de ambiente)
- jest / supertest (testes)

Também são usadas bibliotecas utilitárias como `nanoid`, `reflect-metadata`, `rxjs` e `zod`.

## Arquitetura básica

- Código fonte: `src/`
  - `src/auth` - autenticação e estratégias
  - `src/users` - módulo de usuários
  - `src/estacionamentos` - módulo de estacionamentos
  - `src/vagas` - módulo de vagas
  - `src/db` - conexão, schema Drizzle, migrations e seed
  - `src/main.ts` - bootstrap da aplicação (usa `cookie-parser` e habilita CORS para `http://localhost:5173`)

## Variáveis de ambiente

O projeto espera as seguintes variáveis de ambiente (exemplos):

```
DATABASE_URL=postgres://docker:docker@localhost:5432/parkiatst
PORT=3000
JWT_SECRET=algumSegredoMuitoSecreto
```

- `DATABASE_URL`: URL de conexão com Postgres (obrigatória). Ex.: `postgres://user:pass@host:5432/dbname`
- `PORT`: porta onde a API escuta (default 3000 via `src/env.ts`)
- `JWT_SECRET`: segredo para assinar tokens JWT (o projeto possui um fallback: `meuSecretoSuperSecreto123`, mas é recomendado definir em produção)

Crie um arquivo `.env` na raiz com essas variáveis durante o desenvolvimento.

## Docker (recomendado para desenvolvimento)

O repositório inclui um `docker-compose.yml` que sobe um container Postgres (imagem `postgres:17`) com as credenciais padrão:

- POSTGRES_USER: docker
- POSTGRES_PASSWORD: docker
- POSTGRES_DB: parkiatst

Para levantar o banco com Docker Compose:

```powershell
docker-compose up -d
```

Depois disso, defina `DATABASE_URL` apontando para `postgres://docker:docker@localhost:5432/parkiatst` (ou use `.env`).

## Instalação e execução local

1. Instale dependências

```powershell
npm install
```

2. Ajuste `.env` com `DATABASE_URL`, `PORT` e `JWT_SECRET`.

3. Inicialize o banco (se estiver usando Docker, primeiro rode `docker-compose up -d`).

4. Rode migrações (Drizzle Kit) e depois o seed (caso tenha migrations geradas):

```powershell
npm run db:migrate
npm run db:seed
```

Observação: as migrations são geradas/rodadas via `drizzle-kit` (veja `drizzle.config.ts`), que usa `env.DATABASE_URL`.

5. Em desenvolvimento:

```powershell
npm run start:dev
```

Para produção:

```powershell
npm run build; npm run start:prod
```

## Scripts úteis (conforme `package.json`)

- `npm run start` - inicia a aplicação (modo padrão do Nest)
- `npm run start:dev` - inicia em modo watch (recomendado para dev)
- `npm run start:prod` - roda o build gerado em `dist`
- `npm run build` - `nest build` (gera `dist`)
- `npm run lint` - executa eslint e corrige problemas quando possível
- `npm run format` - formata com Prettier
- `npm run test` - executa testes (Jest)
- `npm run test:e2e` - executa testes e2e
- `npm run db:generate` - `npx drizzle-kit generate` (gera migrations a partir do schema)
- `npm run db:migrate` - `npx drizzle-kit migrate` (aplica migrations)
- `npm run db:studio` - `npx drizzle-kit studio` (interface do Drizzle)
- `npm run db:seed` - executa o seed (arquivo `src/db/seed.ts`) via `ts-node`

## Como o seed funciona

O seed (`src/db/seed.ts`) popula o banco com alguns usuários (admin, João, Maria), cria estacionamentos, associações e gera vagas para cada estacionamento. Para executá-lo:

```powershell
npm run db:seed
```

Isso utiliza `drizzle-orm` para inserir dados e `bcrypt` para hash de senhas.

## Autenticação

- Estratégia JWT: `src/auth/strategies/jwt.strategy.ts` lê o token do cookie `access_token`.
- A geração do token é feita pelo serviço `AuthService` usando `@nestjs/jwt`.
- Endpoints protegidos usam guards (`jwt-auth.guard.ts`, `roles.guard.ts`) e decorators personalizados (`current-user.decorator.ts`, `roles.decorator.ts`).

Observação: por conveniência o código define um segredo padrão (`meuSecretoSuperSecreto123`) caso `JWT_SECRET` não esteja definido — altere em ambientes reais.

## Testes

Unit/integration: `npm run test`

E2E: `npm run test:e2e` (config `test/jest-e2e.json`)

Recomenda-se rodar os testes em uma instância de banco dedicada ou com mocks. Alguns testes e2e podem depender de um banco rodando em `DATABASE_URL`.

## Dicas e troubleshooting

- Se a aplicação não conectar ao Postgres, confirme `DATABASE_URL` e se o container está rodando (`docker ps`).
- Para visualizar migrations geradas: `src/db/migrations`.
- Caso altere schemas, gere uma migration com `npm run db:generate` e então aplique com `npm run db:migrate`.
- Se o seed falhar com erro de duplicate key, limpe os dados ou recrie o volume do Postgres (cuidado: perda de dados):

```powershell
docker-compose down -v; docker-compose up -d
```

## Estrutura de pastas (resumo)

- `src/`
  - `app.module.ts` - módulo raiz
  - `main.ts` - bootstrap
  - `db/` - conexão Drizzle, schema, migrations e seed
  - `auth/`, `users/`, `estacionamentos/`, `vagas/`, `usuarios-estacionamentos/` 
