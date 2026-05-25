import { AppError } from "@/shared/errors/app-error";

export class GenerationError extends AppError {
  constructor(
    public readonly message: string,
    public readonly detalhes: any = null,
  ) {
    super(message, 400, undefined, detalhes);
  }
}
