import type { Config } from "jest";
import { pathsToModuleNameMapper } from "ts-jest";
import { readFileSync } from "node:fs";

// Lê o tsconfig.json de forma síncrona e converte em objeto
const { compilerOptions } = JSON.parse(
  readFileSync("./tsconfig.json", "utf-8"),
);

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/src"],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, {
      prefix: "<rootDir>/",
    }),
  },

  // Mapeia onde o Jest deve procurar por testes
  testMatch: ["**/__tests__/**/*.ts", "**/?(*.)+(spec|test).ts"],
  // Limpa mocks automaticamente entre cada teste
  clearMocks: true,
  // Coleta cobertura de código
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  // Se você utiliza ts-jest, garante a transpilacao com suporte a ESM
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
      },
    ],
  },
  // Diz ao Jest para tratar extensões TypeScript como ESM
  // extensionsToTreatAsEsm: [".ts"],
};

export default config;
