export type Tipo = "carro" | "moto" | "deficiente";
export type Status = "livre" | "ocupada" | "bloqueada";

export class AddVagasDto {
    numero: string;
    tipo: Tipo;
    estacionamentoId: number;
    status?: Status;
}
