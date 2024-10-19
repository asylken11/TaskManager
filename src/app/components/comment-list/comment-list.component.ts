import { Component } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment.model';

@Component({
  selector: 'app-comment-list',
  //standalone: true,
  //imports: [],
  templateUrl: './comment-list.component.html',
  styleUrl: './comment-list.component.css'
})
export class CommentListComponent {
  comments : Comment[] = [];
  constructor(private commentService: CommentService){}

  ngOnInit(): void {
    this.comments = this.commentService.getComments();
  }
}
