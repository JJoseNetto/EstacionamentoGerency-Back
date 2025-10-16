import { db } from './connection';
import * as bcrypt from 'bcrypt';
import { users } from './schema/users';
import { estacionamentos } from './schema/estacionamentos';
import { usuarios_estacionamentos } from './schema/usuarios_estacionamentos';
import { vagas } from './schema/vagas';

async function main() {
  console.log('🌱 Iniciando seed...');

  const [admin, joao, maria] = await Promise.all([
    (async () => {
      const hash = await bcrypt.hash('admin123', 10);
      const [u] = await db
        .insert(users)
        .values({
          nome: 'Admin Master',
          cpf: '00011122233',
          email: 'admin@admin.com',
          password_hash: hash,
          role: 'admin',
        })
        .returning();
      return u;
    })(),
    (async () => {
      const hash = await bcrypt.hash('user123', 10);
      const [u] = await db
        .insert(users)
        .values({
          nome: 'João Silva',
          cpf: '11122233344',
          email: 'joao@user.com',
          password_hash: hash,
          role: 'user',
        })
        .returning();
      return u;
    })(),
    (async () => {
      const hash = await bcrypt.hash('user123', 10);
      const [u] = await db
        .insert(users)
        .values({
          nome: 'Maria Souza',
          cpf: '22233344455',
          email: 'maria@user.com',
          password_hash: hash,
          role: 'user',
        })
        .returning();
      return u;
    })(),
  ]);

  console.log('✅ Usuários criados');

  const estacionamentosData = [
    { nome: 'Estacionamento Central', qtdVagas: 10 },
    { nome: 'Estacionamento Norte', qtdVagas: 15 },
    { nome: 'Estacionamento Sul', qtdVagas: 20 },
    { nome: 'Estacionamento Leste', qtdVagas: 25 },
    { nome: 'Estacionamento Oeste', qtdVagas: 25 },
  ];

  interface EstacionamentoComVagas {
    id: number;
    nome: string;
    endereco: string;
    cidade: string;
    estado: string;
    codigo_convite: string | null;
    admin_id: number;
    created_at: Date | null;
    updated_at: Date | null;
    qtdVagas: number;
  }

  const estacionamentosCriados: EstacionamentoComVagas[] = [];

  for (const [index, est] of estacionamentosData.entries()) {
    const [e] = await db
      .insert(estacionamentos)
      .values({
        nome: est.nome,
        endereco: `Rua ${est.nome}, nº ${index + 1}`,
        cidade: 'São Paulo',
        estado: 'SP',
        codigo_convite: `CODE${index + 1}`,
        admin_id: admin.id,
      })
      .returning();

    estacionamentosCriados.push({
      ...e,
      qtdVagas: est.qtdVagas,
    });
  }

  console.log('✅ Estacionamentos criados:', estacionamentosCriados.length);

  const associacoes = [
    // Admin tem acesso a todos
    ...estacionamentosCriados.map((e) => ({
      user_id: admin.id,
      estacionamento_id: e.id,
    })),
    // João tem acesso aos dois primeiros
    {
      user_id: joao.id,
      estacionamento_id: estacionamentosCriados[0].id,
    },
    {
      user_id: joao.id,
      estacionamento_id: estacionamentosCriados[1].id,
    },
    // Maria sem associação
  ];

  await db.insert(usuarios_estacionamentos).values(associacoes);
  console.log('✅ Associações criadas');

  const tipos = ['carro', 'moto', 'deficiente'] as const;
  const statusList = ['livre', 'ocupada', 'bloqueada'] as const;

  for (const est of estacionamentosCriados) {
    const vagasData = Array.from({ length: est.qtdVagas }, (_, i) => {
      const tipo = tipos[Math.floor(Math.random() * tipos.length)];
      let prefix = '';
      switch (tipo) {
        case 'carro':
          prefix = 'C';
          break;
        case 'moto':
          prefix = 'M';
          break;
        case 'deficiente':
          prefix = 'D';
          break;
      }

      return {
        numero: `${prefix}${i + 1}`,
        tipo,
        status: statusList[Math.floor(Math.random() * statusList.length)],
        estacionamento_id: est.id,
      };
    });

    await db.insert(vagas).values(vagasData);
    console.log(`🚗 ${vagasData.length} vagas criadas em ${est.nome}`);
  }

  console.log('🌾 Seed concluído com sucesso!');
  process.exit(0);
}

main().catch((err) => {
  console.error('❌ Erro ao rodar seed:', err);
  process.exit(1);
});
