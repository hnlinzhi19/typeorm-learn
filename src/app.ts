import "reflect-metadata";
import * as express from 'express';
import * as path from 'path';
import {
  createConnection,
  useContainer
} from "typeorm";
import {
  Container
} from "typedi";
import {
  // createExpressServer,
  useExpressServer
} from "routing-controllers";
import {
  UserController
} from "./controller/UserController";

useContainer(Container);
createConnection({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "5246114",
  database: "linz",
  entities: [__dirname + "/entity/*.js"],
  synchronize: true,
  logging: true
}).then(async () => {
  const app = express();
  // 静态 资源
  // app.use(express.static(path.join(__dirname, 'static')));
  app.use(express.static(path.join(__dirname, '../static')));
  console.log("Connected. Now run express app");
  
  // 路由
  useExpressServer(app, {
    routePrefix: "/api",
    controllers: [UserController]
  });
  app.listen(3000);
  console.log("Server is up and running on port 3000. Now send requests to check if everything works.");

}).catch(error => console.log("Error: ", error));