import {
  Body,
  Get,
  JsonController,
  Post,
  Req,
  // BodyParam,
  // Controller
} from "routing-controllers";
import {
  getConnectionManager,
  Repository,
} from "typeorm";
import {
  Info,
} from "../entity/Info";

@JsonController()
export class InfoController {

  private infoRepository: Repository < Info > ;

  constructor() {
    this.infoRepository = getConnectionManager().get().getRepository(Info);
  }

  @Get("/info")
  public async getAll(@Req() request: any) {
    const user = await this.infoRepository.find(request.query);
    // console.log(request.query.id);
    if (user) {
      return {
        code: 0,
        user,
      };
    }
    return {
      code: -1,
      user: null,
    };
  }

  @Post("/info/add")
  public async addUser(@Body() info: Info) {
    const data = await this.infoRepository.save(info);
    // console.log(user);
    return {
      code: 0,
      data,
    };
  }

}
