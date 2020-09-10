import { Component, OnInit, Input } from "@angular/core";
import { UserModel } from "../../classes/user";
import { Product } from "../../classes/product";
import { ShareService } from "../../services/share.service";
import { GlobalService } from "../../services/global.service";

@Component({
  selector: "app-share-modal",
  templateUrl: "./share-modal.component.html",
  styleUrls: ["./share-modal.component.scss"],
})
export class ShareModalComponent implements OnInit {
  @Input() friends: UserModel[];
  @Input() user: UserModel;

  public time: number;

  constructor(
    private shareService: ShareService,
    private globalService: GlobalService
  ) {}

  ngOnInit() {}

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
    let product = this.globalService.getProduct();
    var sharePayload = {
      ProductName: product.name,
      Username: this.user.Username,
      Friends: this.getSelectedFriends(this.friends),
      Time: this.time,
      Color: "",
      Size: "",
    };
    this.shareService.shareAProduct(sharePayload).subscribe(
      (res: any) => {
        if (res) {
          this.friends.forEach((friend) => {
            friend.isChecked = false;
          });
          this.time = 0;
        }
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
