import { Router } from "express";
import { addStudentData } from "../controllers/student";

const router: Router = Router();

router.post("/add-student", addStudentData);

export default router;
