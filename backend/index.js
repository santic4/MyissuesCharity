import express from 'express';
import router from "./src/routes/routes.js";
import { CORS_ORIGIN, NODE_ENV, PORT } from './src/config/config.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { sequelize } from './src/models/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(CORS_ORIGIN){
    app.use(
        cors({
            origin: CORS_ORIGIN,
            methods: ["GET", "POST", "PUT", "DELETE"],
            credentials: true,
            allowedHeaders: ["Content-Type", "Authorization"],  
        })
    )
}else{
    app.use(cors());
}

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("DB connected.");
  } catch (error) {
    console.error("Error to connect DB.", error);
    process.exit(1);
  }

  if (NODE_ENV === "development") {
    try {
      await sequelize.sync({ alter: true });
      console.log("Models synced.");
    } catch (error) {
      console.error("Error syncing models.", error);
    }
  }


  app.use('/api', router);

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  app.use("/", express.static(path.join(__dirname, "../frontend")));

  app.use((req, res) => {
      res.status(404).json({ error: "Route not found"})
  })

  app.listen(PORT, () => {
      console.log(`Backend listen in port: ${PORT}`)
  })
}

startServer();