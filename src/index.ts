import express from "express";
import { authrouter } from "./routes/authRoutes";
import { userrouter } from "./routes/userRoutes";

const app = express();
app.use(express.json());
app.use("/api/v1/auth", authrouter);
app.use("/api/v1/user", userrouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
