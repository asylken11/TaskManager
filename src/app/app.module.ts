import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { CommentListComponent } from './components/comment-list/comment-list.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGuard } from './auth.guard';
import { RegisterComponent } from './components/register/register.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    PostListComponent,
    PostDetailComponent,
    CommentListComponent,
    CategoryListComponent,
    LoginComponent,
    LogoutComponent,
    RegisterComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
