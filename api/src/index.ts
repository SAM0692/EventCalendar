import express from "express";
import { json } from "body-parser";
import { setEventRoutes } from "./routes/EventRoutes";

const app = express();

app.use(json());

const port = 8080;

app.listen(port, () => console.log(`Server started at port: ${port}`));

setEventRoutes(app);

export default app;
