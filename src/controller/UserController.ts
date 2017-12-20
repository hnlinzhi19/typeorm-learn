import {
  Get,
  JsonController,
  Patch,
  Post as HttpPost,
  Controller
} from "routing-controllers";
import {
  getConnectionManager,
  Repository
} from "typeorm";
import {
  User
} from "../entity/User";
import {
  EntityFromParam,
  EntityFromBody,
  EntityFromBodyParam
} from "typeorm-routing-controllers-extensions";

@JsonController()
export class UserController {

  private userRepository: Repository < User > ;

  constructor() {
    this.userRepository = getConnectionManager().get().getRepository(User);
  }

  @Get("/users")
  async getAll() {
    const user = await this.userRepository.find();
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

  @Get("/user/:id")
  get(@EntityFromParam("id") user: User) {
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

  // @HttpPost("/posts")
  // save(@EntityFromBody() post: Post) {
  //   return this.userRepository.save(post);
  // }

  // @Patch("/posts")
  // patch(@EntityFromBodyParam("post1") post1: Post, @EntityFromBodyParam("post2") post2: Post) {
  //   return this.userRepository.save([post1, post2]);
  // }

}