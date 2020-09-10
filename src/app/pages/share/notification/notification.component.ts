import { Component, OnInit } from "@angular/core";
import { ShareService } from "../../../shared/services/share.service";
import { UserModel } from "src/app/shared/classes/user";
import { Notification } from "../../../shared/classes/notification";
import * as moment from "moment";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.scss"],
})
export class NotificationComponent implements OnInit {
  public user: UserModel;
  public notifications: Notification[] = [];
  public newNotifications: Notification[] = [];
  public oldNotificationsCount: number = 0;
  public newNotificationsCount: number = 0;
  public isForcedRefreshed: boolean = true;

  constructor(private shareService: ShareService) {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    if (this.user) {
      this.getNotification();
    }
  }

  ngOnInit() {
    setInterval(() => {
      if (this.user) {
        this.getNotification();
      }
    }, 10000);
  }

  getNotification() {
    this.shareService.getNotification(this.user.Username).subscribe((res) => {
      if (res) {
        if (this.isForcedRefreshed) {
          this.isForcedRefreshed = false;
          this.oldNotificationsCount = res.length;
          this.newNotificationsCount = res.length;
          this.notifications = res;
          this.notifications.forEach((i) => {
            i.TimeDuration = moment(i.Time).fromNow();
          });
          this.notifications.sort((a, b) => {
            return new Date(b.Time).getTime() - new Date(a.Time).getTime();
          });
        } else {
          this.newNotificationsCount = res.length;
        }
      }
    });
  }

  forceRefreshNotifications() {
    this.isForcedRefreshed = true;
    this.getNotification();
  }
}
