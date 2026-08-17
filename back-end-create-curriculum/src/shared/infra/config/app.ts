interface ExpressJson {
  /**
   * Determina o tamanho máximo do json
   */
  limit: string;
}

export const methods: string[] = ["GET", "POST", "PUT", "DELETE", "PATCH"];

export const port: number = 3001;

export const expressJson: ExpressJson = {
  limit: "1mb",
};
