import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {path: 'profile', component: HomeComponent,canActivate: [AuthGuard]},
  {path: 'post', component: PostListComponent,canActivate: [AuthGuard]},
  {path: 'post/:id', component: PostDetailComponent,canActivate: [AuthGuard]},
  {path: 'comment', component: CommentListComponent,canActivate: [AuthGuard]},
  {path: 'category', component: CategoryListComponent,canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
