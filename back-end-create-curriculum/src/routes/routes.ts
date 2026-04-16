import { Router, Request, Response } from "express";
import { PdfController } from "@controllers/pdfController";
import { makeCreateTemplates } from "@/main/factories/makeCreateTemplates";
import { makeCreateCurriculum } from "@/main/factories/makeCreateCurriculum";

const router = Router();

router.post("/criarTemplate", async (req: Request, res: Response) => {
  const pdfController = new PdfController(
    makeCreateTemplates(),
    makeCreateCurriculum(),
  );

  pdfController.handle(req, res);
});

export default router;
