import express, { Request, Response, Express } from "express";
import { connectDB } from "./config/db";
import studentRoutes from "./routes/student";
const app: Express = express();

const port = 5000;

app.use(express.json());
connectDB();
app.use("/api/v1", studentRoutes);

app.listen(port, () => {
  console.log(`server started on port: ${port}`);
});
