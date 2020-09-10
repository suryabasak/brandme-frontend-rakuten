import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { UserModel } from "../shared/classes/user";
import { AuthenticationService } from "../shared/services/authentication.service";
import { AuthService } from "angularx-social-login";
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
declare var $: any;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  public credential = new UserModel();
  public rememberMe: boolean = false;
  public buttonText: string = "Login";

  public user: SocialUser;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private cookieService: CookieService,
    private authService: AuthService
  ) {
    if (this.cookieService.get("bme-username")) {
      this.credential.Username = this.cookieService.get("bme-username");
      this.rememberMe = true;
    }
  }

  ngOnInit() {
    $.getScript("assets/js/script.js");
  }

  register() {
    this.router.navigate(["/register"]);
  }

  login() {
    this.buttonText = "Please Wait...";
    this.auth.login(this.credential).subscribe(
      (user) => {
        if (user && this.rememberMe) {
          this.cookieService.set("bme-username", user.Username.toString());
        }
        this.router.navigateByUrl("/");
      },
      (err) => {
        console.error(err);
        this.buttonText = "Login";
      }
    );
  }

  signInWithGoogle(): void {
    this.authService
      .signIn(GoogleLoginProvider.PROVIDER_ID)
      .then((userData) => {
        let userModel: UserModel = new UserModel();

        userModel.Email = userData.email;
        userModel.FirstName = userData.firstName;
        userModel.LastName = userData.lastName;
        userModel.Username = userData.email;
        userModel.Password = userData.id;
        userModel.ProfileImage = userData.photoUrl;
        userModel.Provider = userData.provider;
        userModel.PhoneNumber = "";
        userModel.Age = "";
        userModel.Gender = "";
        userModel.Address = "";

        this.auth.register(userModel).subscribe(() => {
          this.router.navigateByUrl("/");
        });
      });
  }

  signInWithFB(): void {
    this.authService
      .signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((userData) => {
        let userModel: UserModel = new UserModel();

        userModel.Email = userData.email;
        userModel.FirstName = userData.firstName;
        userModel.LastName = userData.lastName;
        userModel.Username = userData.email;
        userModel.Password = userData.id;
        userModel.ProfileImage = userData.photoUrl;
        userModel.Provider = userData.provider;
        userModel.PhoneNumber = "";
        userModel.Age = "";
        userModel.Gender = "";
        userModel.Address = "";

        this.auth.register(userModel).subscribe(() => {
          this.router.navigateByUrl("/");
        });
      });
  }

  signInWithInstagram(): void{
    
  }
}
