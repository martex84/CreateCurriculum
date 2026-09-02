import { Router, Request, Response } from "express";
import { PdfController } from "@controllers/pdfController";
import { makeCreateTemplates } from "@/subdomains/geracao_templates/adapters/factories/makeCreateTemplates";
import { makeCreateCurriculum } from "@/subdomains/criacao_curriculo/adapters/factories/makeCreateCurriculum";

const router = Router();

router.post("/criarTemplate", async (req: Request, res: Response) => {
  const pdfController = new PdfController(
    makeCreateTemplates(),
    makeCreateCurriculum(),
  );

  pdfController.handle(req, res);
});

export default router;
