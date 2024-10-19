import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  editMode: { [key: number]: boolean } = {}; // Track which posts are in edit mode
  editedPost: { [key: number]: Post } = {}; // Store edited post data

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  // Toggle the edit mode for a specific post
  toggleEditMode(postId: number): void {
    if (this.editMode[postId]) {
      // If canceling edit mode, discard changes
      delete this.editedPost[postId];
    } else {
      // When entering edit mode, clone the current post data for editing
// Clone the current post data for editing
this.editedPost[postId] = { ...this.posts.find(post => post.id === postId)! };
    }
    this.editMode[postId] = !this.editMode[postId];
  }

  // Handle input changes for title
  handleTitleChange(postId: number, event): void {
    this.editedPost[postId].title = event.target.value;
    console.log(event.target.value);
  }

  // Handle input changes for content
  handleContentChange(postId: number,event): void {
    this.editedPost[postId].content = event.target.value;
  }

  // Save the edited post and update the service
  savePost(postId: number): void {
    const updatedPost = this.editedPost[postId];
    this.postService.updatePost(updatedPost);
    this.posts = this.posts.map(post => post.id === postId ? updatedPost : post);
    this.toggleEditMode(postId); // Exit edit mode after saving
  }
}
