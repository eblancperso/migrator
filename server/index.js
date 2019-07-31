import express from "Express";
import cors from "cors";
const app = express();

import { oauthRouter } from "./routes";

app.use(cors());
app.use("/oauth", oauthRouter);

app.listen(4000);
