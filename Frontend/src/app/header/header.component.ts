import { Component, OnInit } from "@angular/core";
import { AuthGuard } from "../user/auth.guard";
import { AuthenticationService } from "../user/authentication.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"]
})
export class HeaderComponent implements OnInit {
  public username;
  public loggedIn: boolean;
  constructor(private guard: AuthGuard, private auth: AuthenticationService) {}

  ngOnInit() {
    this.username = this.auth.user$.value;

    if (this.username != null) {
      this.username = this.username.substring(
        0,
        this.username.lastIndexOf("@")
      );
      this.loggedIn = true;
    }
    console.log(this.username);
  }

  isAuthenticated() {
    return this.guard.isAuthenticated();
  }

  logout() {
    this.loggedIn = false;
    this.auth.logout();
  }
}
