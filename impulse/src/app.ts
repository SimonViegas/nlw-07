import "dotenv/config";
import express from "express";
import { router } from "../routes";

const app = express();
const port = 4000

app.use(express.json());
app.use(router);

app.listen(port, () => console.log(`🚀 Server is runnig on PORT ${port}`))