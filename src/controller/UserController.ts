import {
  Get,
  JsonController,
  Req,
  // Patch,
  Post,
  Body,
  // BodyParam,
  // Controller
} from "routing-controllers";
import {
  getConnectionManager,
  Repository,
} from "typeorm";
import {
  User,
} from "../entity/User";
import {
  Info,
} from "../entity/Info";

@JsonController()
export class UserController {

  private userRepository: Repository < User > ;
  private infoRepository: Repository < Info > ;

  constructor() {
    this.userRepository = getConnectionManager().get().getRepository(User);
    this.infoRepository = getConnectionManager().get().getRepository(Info);
  }
  /**
   * 获取用户信息
   * @param request {id,username,password,email}
   */
  @Get("/users")
  public async getAll(@Req() request: any) {
    const user = await this.userRepository.find(Object.assign({}, request.query, {relations: ["info"]}));
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

  @Post("/users/add")
  public async addUser(@Body() user: User) {
    const nowInfo: Info = new Info();
    nowInfo.comment = "没有 test";
    user.info = nowInfo;
    await this.infoRepository.save(nowInfo);

    const data = await this.userRepository.save(user);
    // console.log(user);
    return {
      code: 0,
      data,
    };
  }
}
