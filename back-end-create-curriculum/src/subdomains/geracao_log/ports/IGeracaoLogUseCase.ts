export interface IGeracaoLogUseCase {
  execution: (message: string | object) => Promise<void>;
}
