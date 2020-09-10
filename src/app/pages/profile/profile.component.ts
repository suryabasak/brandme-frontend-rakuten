import { Component, OnInit } from '@angular/core';
//import{ UserService } from '../../shared/services/user.service';
import { ProductsService } from '../../shared/services/products.service';
import { UserModel } from "../../shared/classes/user";
import { Router } from "@angular/router";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  public friends = [];
  public User = {};
  public user: UserModel = new UserModel();
  friendSearch: string = ''

  constructor(private userService: ProductsService, private router: Router) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem("bme-shopping-user-info"));
    this.userService.getFriend({Username:this.user.Username}).subscribe((friend : any[]) => this.friends = friend);
    //this.userService.getUser({Username:this.user.Username}).subscribe(user => this.User = user);
    //debugger;
  }

}
