import { AuthenticationService } from "../authentication.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.sass"]
})
export class LoginComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onSubmit() {
    this.authService
      .login(this.user.value.username, this.user.value.password)
      .subscribe(
        val => {
          if (val) {
            console.log(this.authService.redirectUrl);
            if (this.authService.redirectUrl) {
              this.router.navigateByUrl(this.authService.redirectUrl);
              this.authService.redirectUrl = undefined;
            } else {
              window.location.href = "/posts";
            }
          } else {
            this.displayNotification("Could not login");
          }
        },
        err => (
          this.displayNotification("Could not login"),
          (this.errorMsg = err.json().message)
        )
      );
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
