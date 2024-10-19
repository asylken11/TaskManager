import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [
    {
      id: 1, user_id: 1, category_id: 1, date: new Date(), title: 'Post 1', rating: 5, content: 'Content 1',
      image_path: 'https://avatars.mds.yandex.net/i?id=1cf04a6f38f0be15415a0c35010d27a3b2bac0ff-12496338-images-thumbs&n=13'
    },
    {
      id: 2, user_id: 2, category_id: 2, date: new Date(), title: 'Post 2', rating: 4, content: 'Content 2',
      image_path: 'https://avatars.mds.yandex.net/i?id=5928f2b58c6f204d0e0c3a5c41c07e13ca333881-10753427-images-thumbs&n=13'
    }
  ];

  constructor() { }

  getPosts(): Post[] {
    return this.posts;
  }

  createPost(post: Post): void {
    this.posts.push(post);
  }

  updatePost(updatedPost: Post): void {
    const index = this.posts.findIndex(post => post.id === updatedPost.id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    }
  }

  deletePost(id: number): void {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}
