import { HttpException, Injectable } from '@nestjs/common';

@Injectable({})
export class PostService {
  posts = [
    {
      id: 1,
      title: 'Chúng tôi là ai?',
      description:
        'Sun Asterisk chứa đựng ước mơ và mục tiêu kiến tạo nên thật nhiều những điều tốt đẹp cho xã hội của tập thể những chiến binh mặt trời.',
      author: 'Sun*',
      url: 'https://sun-asterisk.vn/ve-chung-toi/',
    },
    {
      id: 2,
      title: 'Chúng tôi làm gì?',
      description:
        'Là một Digital Creative Studio, Sun* luôn đề cao tinh thần làm chủ sản phẩm, tư duy sáng tạo trong mỗi dự án để mang đến những trải nghiệm "Awesome" nhất cho end-user',
      author: 'Sun*',
      url: 'https://sun-asterisk.vn/creative-engineering/',
    },
  ];

  getPosts(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.posts);
    });
  }

  getPost(postId): Promise<any> {
    const id = Number(postId);
    return new Promise((resolve) => {
      const post = this.posts.find((post) => post.id === id);
      if (!post) {
        throw new HttpException('Post not found', 404);
      }
      resolve(post);
    });
  }

  addPost(post): Promise<any> {
    return new Promise((resolve) => {
      this.posts.push(post);
      resolve(this.posts);
    });
  }

  deletePost(postId): Promise<any> {
    const id = Number(postId);
    return new Promise((resolve) => {
      const index = this.posts.findIndex((post) => post.id === id);
      if (index === -1) {
        throw new HttpException('Post not found', 404);
      }
      this.posts.splice(index, 1);
      resolve(this.posts);
    });
  }
}
