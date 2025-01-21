import express from "express";
import { AppDataSource } from "./database/data-source";
import resourceRouter from "./routes/resouce.route";
import errorHandler from "./middleware/errorHandler";

const port = process.env.PORT || 3001;
const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");

    app.use("/api", resourceRouter);

    // Start the server
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
    app.use(errorHandler);
  })
  .catch((error) => {
    console.log("Error during Data Source initialization:", error);
  });
