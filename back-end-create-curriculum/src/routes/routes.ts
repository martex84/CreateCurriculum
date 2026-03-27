import { Router, Request, Response } from "express";
// import { criarTemplate } from "@curriculum/controllers/criarTemplate_controller";
import { CriarcaoPdfService } from "@/application/services/criacaoPdf.service";

const router = Router();

router.post("/criarTemplate", async (req: Request, res: Response) => {
  // criarTemplate(req, res);

  const criarcaoPdfService = new CriarcaoPdfService();

  criarcaoPdfService.execution(req, res);
});

export default router;
