import { Router , Request, Response} from "express";

const router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.send({data: "API OK"});
});

export default router;