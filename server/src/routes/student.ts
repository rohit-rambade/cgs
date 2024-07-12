import { Router } from "express";
import { addStudentData, generateCertificate } from "../controllers/student";

const router: Router = Router();

router
  .post("/add-student", addStudentData)
  .post("/generate-certificate/:id", generateCertificate);
export default router;
