import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { AuthenticationService } from "../authentication.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { map } from "rxjs/operators";
import { HttpErrorResponse } from "@angular/common/http";

//Functions
function comparePasswords(control: AbstractControl): { [key: string]: any } {
  const password = control.get("password");
  const confirmPassword = control.get("confirmPassword");
  return password.value === confirmPassword.value
    ? null
    : { passwordsDiffer: true };
}

function serverSideValidateUsername(
  checkAvailabilityFn: (n: string) => Observable<boolean>
): ValidatorFn {
  return (control: AbstractControl): Observable<{ [key: string]: any }> => {
    return checkAvailabilityFn(control.value).pipe(
      map(available => {
        if (available) {
          return null;
        }
        return { userAlreadyExists: true };
      })
    );
  };
}

// End Functions

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.sass"]
})
export class RegisterComponent implements OnInit {
  public user: FormGroup;
  public errorMsg: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.user = this.fb.group({
      fullName: [
        "",
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      email: [
        "",
        [Validators.required, Validators.email],
        serverSideValidateUsername(this.authService.checkUserNameAvailability)
      ],
      passwordGroup: this.fb.group(
        {
          password: ["", [Validators.required, Validators.minLength(8)]],
          confirmPassword: ["", Validators.required]
        },
        { validator: comparePasswords }
      )
    });
  }

  onSubmit() {
    this.authService
      .register(
        this.user.value.fullName,
        this.user.value.email,
        this.user.value.passwordGroup.password
      )
      .subscribe(
        val => {
          if (val) {
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
        (err: HttpErrorResponse) => {
          console.log(err);
          if (err.error instanceof Error) {
            this.displayNotification("Error while trying to register"),
              (this.errorMsg = `Error while trying to login user ${
                this.user.value.email
              }: ${err.error.message}`);
          } else {
            this.displayNotification("Error while trying to register"),
              (this.errorMsg = `Error ${
                err.status
              } while trying to login user ${this.user.value.email}: ${
                err.error
              }`);
          }
        }
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
