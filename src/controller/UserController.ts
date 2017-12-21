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
  Repository
} from "typeorm";
import {
  User
} from "../entity/User";

@JsonController()
export class UserController {

  private userRepository: Repository < User > ;

  constructor() {
    this.userRepository = getConnectionManager().get().getRepository(User);
  }
  /**
   * 获取用户信息
   * @param request {id,username,password,email} 
   */
  @Get("/users")
  async getAll(@Req() request: any) {
    const user = await this.userRepository.find(request.query);
    // console.log(request.query.id);
    if (user) {
      return {
        code: 0,
        user,
      }
    }
    return {
      code: -1,
      user: null
    };
  }

  @Post('/users/add')
  async addUser(@Body() user: User){
    const data = await this.userRepository.save(user);
    // console.log(user);
    return {
      code: 0,
      data,
    }
  }
}