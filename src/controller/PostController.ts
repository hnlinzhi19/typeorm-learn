import {
  Get,
  JsonController,
  Patch,
  Post as HttpPost
} from "routing-controllers";
import {
  getConnectionManager,
  Repository
} from "typeorm";
import {
  Post
} from "../entity/Post";
import {
  EntityFromParam,
  EntityFromBody,
  EntityFromBodyParam
} from "typeorm-routing-controllers-extensions";

@JsonController()
export class PostController {

  private postRepository: Repository < Post > ;

  constructor() {
    this.postRepository = getConnectionManager().get().getRepository(Post);
  }

  @Get("/posts/:id")
  get(@EntityFromParam("id") post: Post) {
    if (post) {
      return {
        code: 0,
        post,
      }
    }
    return {
      code: -1,
      post: null
    };
  }

  @HttpPost("/posts")
  save(@EntityFromBody() post: Post) {
    return this.postRepository.save(post);
  }

  @Patch("/posts")
  patch(@EntityFromBodyParam("post1") post1: Post, @EntityFromBodyParam("post2") post2: Post) {
    return this.postRepository.save([post1, post2]);
  }

}