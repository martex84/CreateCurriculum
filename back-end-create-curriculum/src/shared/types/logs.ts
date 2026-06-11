export interface Logs {
  execution: (message: string | object) => Promise<void>;
}
