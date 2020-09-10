import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ProductsService } from "../shared/services/products.service";
import { Router } from "@angular/router";
import { UserModel } from "../shared/classes/user";
import { AuthenticationService } from "../shared/services/authentication.service";
declare var $: any;

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  userModel = new UserModel();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    $.getScript("assets/js/script.js");
  }

  onSubmit() {
    this.userModel.Age = "";
    this.userModel.PhoneNumber = "";
    this.userModel.ProfileImage = "";
    this.userModel.Address = "";
    this.userModel.Provider = "BME";
    this.auth.register(this.userModel).subscribe(() => {
      this.router.navigateByUrl("/");
    });
  }
}
