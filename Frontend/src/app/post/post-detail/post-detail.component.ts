import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "src/app/models/post";
import { PostsService } from "src/app/services/posts.service";
import { Validators, FormGroup, FormBuilder } from "@angular/forms";
import { AuthGuard } from "src/app/user/auth.guard";
import { delay } from "rxjs/operators";
import { AuthenticationService } from "src/app/user/authentication.service";

@Component({
  selector: "app-post-detail",
  templateUrl: "./post-detail.component.html",
  styleUrls: ["./post-detail.component.sass"]
})
export class PostDetailComponent implements OnInit {
  public post: Post;
  public userName: string;
  public comments;

  public isCreator: boolean;

  public newComment: FormGroup;

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    private auth: AuthenticationService,
    private guard: AuthGuard,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get("id");
    this.postsService
      .getPost$(id)
      .subscribe(val => ((this.post = val), console.log(val), this.makeData()));

    this.newComment = this.fb.group({
      message: ["", [Validators.required, Validators.minLength(1)]]
    });

    //check is logged in == creator
  }

  // Add new comment
  onSubmit() {
    let comment = this.newComment.value.message;
    this.postsService
      .addComment(comment, this.post.aId)
      .subscribe(val => this.redirect("/posts/" + this.post.aId));
  }

  // check if logged in
  isAuthenticated() {
    return this.guard.isAuthenticated();
  }

  likePost() {
    console.log(this.post);
  }
  deletePost() {
    if (confirm("Are you sure you want to delete this?")) {
      this.postsService
        .deletePost(this.post)
        .subscribe(val => this.redirect("/posts"));
    }
  }

  // get 'username' & comments
  makeData() {
    this.userName = this.post.aCreator.substring(
      0,
      this.post.aCreator.lastIndexOf("@")
    );
    if (this.auth.user$.value == this.post.aCreator) {
      this.isCreator = true;
    }
  }

  redirect(url) {
    window.location.href = url;
  }
}
