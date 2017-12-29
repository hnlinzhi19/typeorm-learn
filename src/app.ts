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
import {
  InfoController,
} from "./controller/InfoController";

useContainer(Container);

(async() => {
  // 链接数据库
  await createConnection({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "5246114",
    database: "linz",
    entities: [__dirname + "/entity/*.js"],
    synchronize: true,
    logging: true
  });
  // 创建 service
  const app = express();
  // 静态 资源
  app.use(express.static(path.join(__dirname, '../static')));

  // api 路由
  useExpressServer(app, {
    routePrefix: "/api",
    controllers: [UserController,InfoController]
  });
  // 监听端口
  app.listen(3000);
  // 打印log 
  console.log("Server is up and running on port 3000. Now send requests to check if everything works.");
})();