import { Injectable } from "@angular/core";
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from "@angular/router";
import { Post } from "../models/post";
import { Observable } from "rxjs";
import { PostsService } from '../services/posts.service';

@Injectable({
  providedIn: "root"
})
export class PostResolver implements Resolve<Post> {

    constructor(private postsService: PostsService){}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Post> {
      return this.postsService.getPost$(route.params['id']);
  }
}
