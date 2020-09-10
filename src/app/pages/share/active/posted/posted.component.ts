import { Component, OnInit } from "@angular/core";
import { Product } from "../../../../shared/classes/product";
import { ProductsService } from "../../../../shared/services/products.service";
import { UserModel } from "src/app/shared/classes/user";
import { ShareProductdetails } from "../../../../shared/classes/Share";
import { CommentAProduct } from "../../../../../app/shared/classes/product";

@Component({
  selector: "app-posted",
  templateUrl: "./posted.component.html",
  styleUrls: ["./posted.component.scss"],
})
export class PostedComponent implements OnInit {
  public postedShares: ShareProductdetails[];
  public user: UserModel = new UserModel();
  public commentAproduct: CommentAProduct;
  constructor(public productsService: ProductsService) {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    this.GetPostedShares();
  }

  ngOnInit() {}

  GetPostedShares() {
    this.productsService
      .getPostedshareProduct(this.user.Username)
      .subscribe((res: any[]) => {
        this.postedShares = res;

        this.postedShares.sort((a, b) => {
          return (
            new Date(b.Share.SharedOn).getTime() -
            new Date(a.Share.SharedOn).getTime()
          );
        });
        this.postedShares.forEach((elem) => {
          let shareExpireOn = new Date(elem.Share.SharedOn);
          shareExpireOn.setMinutes(
            shareExpireOn.getMinutes() + Number(elem.Share.Time)
          );
          if (shareExpireOn < new Date()) {
            elem.IsExpired = true;
          }
          elem.Comments.sort((a, b) => {
            return (
              new Date(b.CommentedOn).getTime() -
              new Date(a.CommentedOn).getTime()
            );
          });
        });
      });
  }

  OnClickComment(product, index) {
    debugger;
    this.commentAproduct = {
      Username: this.user.Username,
      FriendUsername: product.User.Username,
      ProductName: product.Product.name,
      Comment: product.NewComment,
    };
    this.productsService.CommentAProduct(this.commentAproduct).subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.postedShares[index].Comments.push(res[0]);
          this.postedShares[index].NewComment = "";
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  buyNow(product) {
    window.open(product.variants[0].url, "_blank");
  }
}
