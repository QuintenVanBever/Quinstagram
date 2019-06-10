import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../models/post";
import { PostsService } from "../services/posts.service";

@Component({
  selector: "app-content-container",
  templateUrl: "./content-container.component.html",
  styleUrls: ["./content-container.component.sass"]
})
export class ContentContainerComponent implements OnInit {
  private _fetchPosts$: Observable<Post[]> = this._postsService.posts$;

  constructor(private _postsService: PostsService) {}

  ngOnInit() {}

  get posts$(): Observable<Post[]> {
    return this._fetchPosts$;
  }
}
