/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Header, Param, Post } from '@nestjs/common';
import { PostService } from './post.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CreatePostDto from './create-auth';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}
    
    @Get()
    async getPosts() {
        const posts = await this.postService.findAll();
        return posts;
    }
    @Post('add')
    async addCustomer(){
      const posts = await this.postService.addNewCus();
      return posts;
    }
}

