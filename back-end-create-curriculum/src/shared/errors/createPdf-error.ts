import { AppError } from "@/shared/errors/app-error";

export class CreatePdfError extends AppError {
  constructor(public readonly message: string) {
    super(message, 400);
  }
}
