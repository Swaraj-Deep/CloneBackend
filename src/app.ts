import express, { Application, Request, Response, NextFunction } from "express";

const app: Application = express();
const PORT: number = 3000;

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Ok!",
  });
});

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
