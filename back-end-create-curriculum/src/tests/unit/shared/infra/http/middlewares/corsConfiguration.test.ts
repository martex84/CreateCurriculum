import { CorsError } from "@/shared/errors/cors-error";
import { InformacoesEnv } from "@/shared/infra/config/importarInformacoesEnv";
import {
  corsMiddleware,
  error,
} from "@shared/infra/http/middlewares/corsConfiguration";
import { notDeepEqual } from "assert";
import { Request, Response, NextFunction } from "express";

interface ErroOrigin {
  tipo: string;
  valor: any;
}

describe("corsMiddleware", () => {
  let informacoesEnv: InformacoesEnv;
  let mockReq: Partial<Request>;
  let mockRes: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    informacoesEnv = { PERMITION_SITES: "teste" };

    const headersMap = new Map<string, string>();

    mockReq = {
      headers: {},
      method: "GET",
    };

    mockRes = {
      statusCode: 200,
      getHeader: jest.fn((name: string) =>
        headersMap.get(name.toLocaleLowerCase()),
      ),
      setHeader: jest.fn((name: string, value: string) => {
        headersMap.set(name.toLocaleLowerCase(), value);
        return mockRes as Response;
      }),
      end: jest.fn(),
    };

    mockNext = jest.fn();
  });

  test("Verifica se ocorre aprovação para o caso do origin ser válido e estar dentro da lista permitida", () => {
    const verificacao = corsMiddleware(informacoesEnv);

    mockReq.headers = { origin: informacoesEnv.PERMITION_SITES };

    verificacao(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      "Access-Control-Allow-Origin",
      informacoesEnv.PERMITION_SITES,
    );
  });

  test("Verifica se ocorre aprovação para o caso do origin estava vazio", () => {
    const verificacao = corsMiddleware(informacoesEnv);

    mockReq.headers = { origin: undefined };

    verificacao(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith();
    expect(mockRes.setHeader).not.toHaveBeenCalledWith(
      "Access-Control-Allow-Origin",
      expect.any(String),
    );
  });

  test("Verifica se ocorre erro quando o origin é diferente do esperado", () => {
    const verificacao = corsMiddleware(informacoesEnv);

    mockReq.headers = { origin: informacoesEnv.PERMITION_SITES + 1 };

    verificacao(mockReq as Request, mockRes as Response, mockNext);

    expect(mockNext).toHaveBeenCalledWith(expect.any(CorsError));
    expect(mockNext).toHaveBeenCalledWith(
      expect.objectContaining({
        message: error.ORIGIN_BLOCKED,
      }),
    );
  });
});
