import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { PostsService } from "../../services/posts.service";
import { Post } from "../../models/post";
import { AuthenticationService } from "src/app/user/authentication.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-post",
  templateUrl: "./add-post.component.html",
  styleUrls: ["./add-post.component.sass"]
})
export class AddPostComponent implements OnInit {
  public post: FormGroup;
  public imageUrl: string;
  public selectedFile: File = null;
  public previewImg: string = "";

  constructor(
    private fb: FormBuilder,
    private _postsService: PostsService,
    private auth: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.post = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(1)]],
      description: ["", [Validators.required, Validators.minLength(1)]],
      imageUrl: ["", [Validators.required]]
    });
    console.log(this.auth.user$);
  }

  fileInput(file: FileList) {
    this.selectedFile = file.item(0);

    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.previewImg = event.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }
  onSubmit() {
    this.imageUrl = this.post.value.imageUrl.replace("C:\\fakepath\\", "");
    if (this.post.value.title != "") {
      if (this.post.value.description != "") {
        if (this.imageUrl != "") {
          this._postsService
            .addNewPost(
              new Post(
                this.post.value.title,
                this.post.value.description,
                this.imageUrl,
                this.auth.user$.value
              )
            )
            .subscribe(val => this.redirect(val));
        } else {
          this.displayNotification("Please upload a picture");
        }
      } else {
        this.displayNotification("Please enter a description");
      }
    } else {
      this.displayNotification("Please enter a title");
    }
    console.log(this.post.value.title);
    //creatorID staat momenteel uit in model -> aanpassen wanneer authenticatie klaar is

    //Foto moet nog worden opgeslaan
  }

  redirect(val) {
    let id = val.id;
    this.router.navigate(["/posts/" + id]);
  }

  // Start notification code
  async displayNotification(text) {
    let notif = document.getElementsByClassName("notification");
    // Add text
    notif[0].textContent = "";
    notif[0].textContent += text;
    // Show text
    notif[0].className += " notification-error";
    await this.delay(1500);
    notif[0].className = "notification";
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  // Einde notificaton code
}
