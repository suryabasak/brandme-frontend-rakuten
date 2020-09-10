import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-share",
  templateUrl: "./share.component.html",
  styleUrls: ["./share.component.scss"],
})
export class ShareComponent implements OnInit {
  constructor(private router: Router) {
    if (window.localStorage.getItem("bme-shopping-user-info") == null) {
      this.router.navigateByUrl("/login");
    }
  }

  ngOnInit() {}
}
