import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PostComponent } from "./post/post.component";
import { AddPostComponent } from "./add-post/add-post.component";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../material/material.module";
import { HomeComponent } from "../home/home.component";
import { RouterModule } from "@angular/router";
import { ContentContainerComponent } from '../content-container/content-container.component';
import { PostDetailComponent } from './post-detail/post-detail.component';

@NgModule({
  declarations: [ContentContainerComponent, HomeComponent, PostComponent, AddPostComponent, PostDetailComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule, MaterialModule]
})
export class PostModule {}
