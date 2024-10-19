import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments: Comment[] = [
    { id: 1, post_id: 1, user_id: 1, date: new Date(), body: 'Comment 1' },
    { id: 2, post_id: 2, user_id: 2, date: new Date(), body: 'Comment 2' }
  ];

  constructor() { }

  getComments(): Comment[] {
    return this.comments;
  }

  createComment(comment: Comment): void {
    this.comments.push(comment);
  }

  updateComment(updatedComment: Comment): void {
    const index = this.comments.findIndex(comm => comm.id === updatedComment.id);
    if (index !== -1) {
      this.comments[index] = updatedComment;
    }
  }

  deleteComment(id: number): void {
    this.comments = this.comments.filter(comm => comm.id !== id);
  }
}
