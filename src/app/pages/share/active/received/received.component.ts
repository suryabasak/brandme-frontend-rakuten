import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { ProductsService } from "../../../../shared/services/products.service";
import { LikeProduct } from "../../../../shared/classes/product";
import { DislikeaProduct } from "../../../../shared/classes/product";
import { UserModel } from "src/app/shared/classes/user";
import { CommentAProduct } from "../../../../../app/shared/classes/product";
import {
  ShareProductdetails,
  Comments,
} from "../../../../shared/classes/Share";
import { Product } from "../../../../../app/shared/classes/product";
@Component({
  selector: "app-received",
  templateUrl: "./received.component.html",
  styleUrls: ["./received.component.scss"],
})
export class ReceivedComponent implements OnInit {
  public shares: ShareProductdetails[];
  public activeShare: any[] = [];
  public expiredShare: any[] = [];
  public user: UserModel = new UserModel();
  public likeProduct: LikeProduct;
  public DislikeAProduct: DislikeaProduct;
  public currentActiveIndex: number = -1;
  public commentAproduct: CommentAProduct;
  public products: ShareProductdetails[];
  public comments: Comments[] = [];
  public share: ShareProductdetails[] = [];

  constructor(
    public productsService: ProductsService,
    private changeDetection: ChangeDetectorRef
  ) {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    this.GetReceivedShare();
  }

  ngOnInit() {}

  GetReceivedShare() {
    this.productsService
      .getActiveshareProduct(this.user.Username)
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
    this.GetActiveShare(this.shares);
        this.GetExpiredShare(this.shares);
      });
  }

  GetActiveShare(shares: any[]) {
    try {
      this.activeShare = [];
      shares.forEach((elem) => {
        var shareExpireOn = new Date(elem.Share.SharedOn);
        shareExpireOn.setMinutes(
          shareExpireOn.getMinutes() + Number(elem.Share.Time)
        );
        if (shareExpireOn >= new Date()) {
          var dif = Math.abs(
            (new Date().getTime() - shareExpireOn.getTime()) / 1000
          );
          elem.leftTime = dif;
          this.activeShare.push(elem);
        }
      });
    } catch (error) {
      this.activeShare = [];
    }
  }

  GetExpiredShare(shares: any[]) {
    this.expiredShare = [];
    try {
      shares.forEach((elem) => {
        let shareExpireOn = new Date(elem.Share.SharedOn);
        shareExpireOn.setMinutes(
          shareExpireOn.getMinutes() + Number(elem.Share.Time)
        );
        if (shareExpireOn < new Date()) {
          this.expiredShare.push(elem);
        }
      });
    } catch (error) {
      this.expiredShare = [];
    }
  }

  OnClicklike(share, index) {
    if (share.IsLikedByMe) return;
    this.likeProduct = {
      Username: this.user.Username,
      ProductName: share.Product.name,
    };
    this.productsService.likeaProduct(this.likeProduct).subscribe(
      (res: any) => {
        if (res) {
          this.activeShare[index].IsLikedByMe = true;
          this.activeShare[index].TotalLike += 1;
          if (this.activeShare[index].TotalDislike > 0) {
            this.activeShare[index].IsDislikedByMe = false;
            this.activeShare[index].TotalDislike -= 1;
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  OnClickDislike(share, index) {
    if (share.Dislike > 0) return;
    this.DislikeAProduct = {
      Username: this.user.Username,
      ProductName: share.Product.name,
    };

    this.productsService.DislikeaProduct(this.DislikeAProduct).subscribe(
      (res: any) => {
        if (res) {
          this.activeShare[index].IsDislikedByMe = true;
          this.activeShare[index].TotalDislike += 1;
          if (this.activeShare[index].TotalLike > 0) {
            this.activeShare[index].IsLikedByMe = false;
            this.activeShare[index].TotalLike -= 1;
          }
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  OnClickComment(share, index) {
    this.commentAproduct = {
      Username: this.user.Username,
      FriendUsername: share.User.Username,
      ProductName: share.Product.name,
      Comment: share.NewComment,
    };

    this.productsService.CommentAProduct(this.commentAproduct).subscribe(
      (res: any) => {
        if (res.length > 0) {
          this.activeShare[index].Comments.push(res[0]);
          this.activeShare[index].NewComment = "";
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }

  rearrangeShares(event) {
    if (event.left == 0) {
      this.GetActiveShare(this.shares);
      this.GetExpiredShare(this.shares);
    }
  }

  buyNow(product) {
    window.open(product.variants[0].url, "_blank");
  }

  commentshow(index) {
    if (this.currentActiveIndex != index) {
      this.currentActiveIndex = index;
    } else {
      this.currentActiveIndex = -1;
    }
  }

  // Team Slick slider config
  public activeSliderConfig = {
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
        },
      },
    ],
  };
}
