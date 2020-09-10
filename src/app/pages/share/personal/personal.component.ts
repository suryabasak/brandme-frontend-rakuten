import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ProductsService } from "../../../shared/services/products.service";
import { UserModel } from "../../../shared/classes/user";
import { Productshare } from "../../../../app/shared/classes/product";
import { Product } from "../../../../app/shared/classes/product";
import { LikeProduct } from "../../../../app/shared/classes/product";
import { DislikeaProduct } from "../../../shared/classes/product";
import { CommentAProduct } from "../../../../app/shared/classes/product";
import { ConditionalExpr } from "@angular/compiler";
import { Router } from "@angular/router";
import { ShareProductdetails } from "../../../shared/classes/Share";
import { NgForm } from "@angular/forms";

//import {}
@Component({
  selector: "app-personal",
  templateUrl: "./personal.component.html",
  styleUrls: ["./personal.component.scss"],
})
export class PersonalComponent implements OnInit {
  public friends: UserModel[];
  public product: Product;
  public shares: ShareProductdetails[];
  public user: UserModel;
  public getlikeproducts: Product[];

  public productshare: Productshare;
  public name: string;
  public like: number;
  public likeProduct: LikeProduct;
  public DislikeaProduct: DislikeaProduct;
  public commentAproduct: CommentAProduct;
  public time: number;
  public Username: string;

  mySubscription: any;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private changeDetection: ChangeDetectorRef
  ) {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    this.GetPersonalShares();
    this.GetFriends();
  }

  ngOnInit() {}

  GetFriends() {
    this.productsService
      .getFriend({ Username: this.user.Username })
      .subscribe((res: any[]) => {
        this.friends = res;
      });
  }

  GetPersonalShares() {
    this.productsService
      .getAllproduct(this.user.Username)
      .subscribe((res: any[]) => {
        this.shares = res;
        this.shares.sort((a, b) => {
          return (
            new Date(b.Share.SharedOn).getTime() -
            new Date(a.Share.SharedOn).getTime()
          );
        });
        this.shares.forEach((elem) => {
          elem.Comments.sort((a, b) => {
            return (
              new Date(a.CommentedOn).getTime() -
              new Date(b.CommentedOn).getTime()
            );
          });
        });
      });
  }

  // OnClicklike(product) {
  //   this.likeProduct = {
  //     Username: this.user.Username,
  //     ProductName: product.Product.name,
  //   };
  //   this.productsService
  //     .likeaProduct(this.likeProduct)
  //     .subscribe((res: any) => res),
  //     (err) => {
  //       console.error(err);
  //     };
  // }
  // OnClicklike(product) {

  //   //alert(product.Product.name);
  //   this.likeProduct = {
  //     Username: this.user.Username,
  //     ProductName: product.Product.name,
  //   };
  //   //debugger;
  //   this.productsService
  //     .likeaProduct(this.likeProduct)
  //     .subscribe((res: any) => {
  //       if (res) {
  //         // this.share.forEach((res) => {
  //         //   this.share.push(res[0])
  //         //   debugger;
  //         //   this.ngOnInit();
  //         // });

  //         this.GetPersonalShares();
  //         this.changeDetection.detectChanges();
  //       }
  //       (err) => {
  //         console.error(err);
  //       };
  //     })

  // }
  OnClicklike(share, index) {
    if (share.IsLikedByMe) return;
    this.likeProduct = {
      Username: this.user.Username,
      ProductName: share.Product.name,
    };
    this.productsService.likeaProduct(this.likeProduct).subscribe(
      (res: any) => {
        if (res) {
          this.shares[index].IsLikedByMe = true;
          this.shares[index].TotalLike += 1;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
  // OnClickDislike(product) {
  //   this.DislikeaProduct = {
  //     Username: this.user.Username,
  //     ProductName: product.Product.name,
  //   };
  //   this.productsService
  //     .DislikeaProduct(this.DislikeaProduct)
  //     .subscribe((res: any) => res),
  //     (err) => {
  //       console.error(err);
  //     };
  // }
  // OnClickComment(product, index) {
  //   this.commentAproduct = {
  //     Username: this.user.Username,
  //     FriendUsername: product.User.Username,
  //     ProductName: product.Product.name,
  //     Comment: product.NewComment,
  //   };
  //   console.log(this.commentAproduct);
  //   this.productsService.CommentAProduct(this.commentAproduct).subscribe(
  //     (res: any) => {
  //       if (res.length > 0) {
  //         this.shares[index].Comments.push(res[0]);
  //         this.shares[index].NewComment = "";
  //       }
  //     },
  //     (err) => {
  //       console.error(err);
  //     }
  //   );
  // }

  getSelectedProduct(prod) {
    this.product = prod;
  }

  getSelectedFriends(friends: UserModel[]) {
    var friendList = "";
    friends.forEach((friend) => {
      if (friend.isChecked) {
        if (friendList == "") {
          friendList += friend.Username;
        } else {
          friendList += "," + friend.Username;
        }
      }
    });
    return friendList;
  }

  shareProduct() {
    var sharePayload = {
      ProductName: this.product.name,
      Username: this.user.Username,
      Friends: this.getSelectedFriends(this.friends),
      Time: this.time,
      Color: "",
      Size: "",
    };
    this.productsService.shareAProduct(sharePayload).subscribe(
      (res: any) => {
        if (res) {
          this.product = null;
          this.friends.forEach((friend) => {
            friend.isChecked = false;
          });
          this.time = 0;
          this.GetPersonalShares();
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
