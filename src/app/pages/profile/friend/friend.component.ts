import { Component, OnInit } from '@angular/core';
import {ProductsService} from '../../../shared/services/products.service';
import {UserModel} from '../../../shared/classes/user';
import { removeAfriend } from "../../../shared/classes/product";
import { CacheService } from "src/app/shared/services/cache.service";
import { Router } from "@angular/router";
import { from } from 'rxjs';


@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit {
  
  public friends = [];
  public User = {};
  public user: UserModel = new UserModel();
  public friend: UserModel;
  friendSearch: string = ''
  public RemoveAfriend: removeAfriend;

  constructor(private userService: ProductsService,
    private router: Router,
    public productsService: ProductsService,
    private cacheService: CacheService,
    ) { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem("bme-shopping-user-info"));
    if (this.user) {
      this.getFriendlist();
    }
    // this.userService.getFriend({Username:this.user.Username}).subscribe((friend : any[]) => this.friends = friend);
    //this.userService.getUser({Username:this.user.Username}).subscribe(user => this.User = user);
    //debugger;
  }

  // async getFriendlist() {
  //   this.friends = await this.cacheService.getFriendlist();
  // }

  getFriendlist() {
    this.userService.getFriend({Username:this.user.Username}).subscribe((friend : any[]) => this.friends = friend);
  }

  OnClickRemoveFriend(friend) {
    this.friend=friend
    this.RemoveAfriend = {
      Username: this.user.Username,
      FriendUsername: this.friend.Username,
    };
    debugger
    this.productsService.removeAfriend(this.RemoveAfriend).subscribe(
      (res: any) => {
        if(res){
          this.getFriendlist();
        }},
        (error) => {
          console.error(error);
        })
      }
    }
    
      

  


