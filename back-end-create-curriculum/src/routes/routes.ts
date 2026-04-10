import { Router, Request, Response } from "express";
// import { criarTemplate } from "@curriculum/controllers/criarTemplate_controller";
import { PdfController } from "@controllers/pdfController";

const router = Router();

router.post("/criarTemplate", async (req: Request, res: Response) => {
  // criarTemplate(req, res);

  const pdfController = new PdfController();

  pdfController.handle(req, res);
});

export default router;
