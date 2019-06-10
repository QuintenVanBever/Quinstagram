import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of } from "rxjs";
import { map, catchError, tap } from "rxjs/operators";
import { Post } from "../models/post";
import { Comment } from "../models/comment";

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class PostsService {
  constructor(private http: HttpClient) {}

  get posts$(): Observable<Post[]> {
    return this.http.get(`${environment.apiUrl}/posts/`).pipe(
      map(
        (list: any[]): Post[] =>
          list
            .map(Post.fromJSON)
            .sort(function(a, b) {
              return a.aId - b.aId;
            })
            .reverse()
      )
    );
  }

  getPost$(id): Observable<Post> {
    return this.http
      .get(`${environment.apiUrl}/posts/${id}`)
      .pipe(map((rec: any): Post => Post.fromJSON(rec)));
  }

  addNewPost(post: Post) {
    return this.http.post(`${environment.apiUrl}/posts/`, post.toJSON());
  }

  // updatePost(post: Post) {
  //   return this.http
  //     .put(`${environment.apiUrl}/posts/${post.aId}`, post.toJSON())
  //     .pipe();
  // }

  deletePost(post: Post){
    return this.http
    .delete(`${environment.apiUrl}/posts/${post.aId}`, post.toJSON()).pipe();
  }

  // Add a comment to a post
  addComment(message: string, id: number) {
    let comment = new Comment(message);
    return this.http.post(
      `${environment.apiUrl}/posts/${id}/comments`,
      comment.toJSON()
    );
  }
}
