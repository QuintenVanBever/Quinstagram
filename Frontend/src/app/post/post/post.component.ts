import { Component, OnInit, Input } from "@angular/core";
import { Post } from "../../models/post";
import { Observable } from "rxjs";
import { PostsService } from "../../services/posts.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { AuthGuard } from "src/app/user/auth.guard";
import { Router } from "@angular/router";

@Component({
  selector: "app-post",
  templateUrl: "./post.component.html",
  styleUrls: ["./post.component.sass"]
})
export class PostComponent implements OnInit {
  @Input() public post: Post;
  public userName: string;

  public newComment: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _postsService: PostsService,
    private guard: AuthGuard,
    private router: Router
  ) {}

  ngOnInit() {
    this.newComment = this.fb.group({
      message: ["", [Validators.required, Validators.minLength(1)]]
    });

    this.userName = this.post.aCreator.substring(
      0,
      this.post.aCreator.lastIndexOf("@")
    );
  }

  likePost() {
    console.log(this.post);
  }
  
  onSubmit() {
    let comment = this.newComment.value.message;
    this._postsService
      .addComment(comment, this.post.aId)
      .subscribe(val => this.redirect());
  }

  isAuthenticated() {
    return this.guard.isAuthenticated();
  }
  redirect() {
    this.router.navigate(["/posts/" + this.post.aId]);
  }

  goToDetail() {
    console.log("ok");
    this.redirect();
  }
}
