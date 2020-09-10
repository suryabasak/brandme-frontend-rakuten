import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Menu } from "./left-menu-items";
import { CacheService } from "../../../services/cache.service";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";
import { CategoryMenu } from "src/app/shared/classes/category";
declare var $: any;

@Component({
  selector: "app-left-menu",
  templateUrl: "./left-menu.component.html",
  styleUrls: ["./left-menu.component.scss"],
})
export class LeftMenuComponent implements OnInit {
  public menuItems: Menu[] = [];
  constructor(
    private router: Router,
    public cacheService: CacheService,
    private httpParameterEncoder: HttpParameterEncoder
  ) {}

  ngOnInit() {
    this.getMenudata();
  }

  async getMenudata() { 
    let menu: CategoryMenu[] = [];

    menu = await this.cacheService.getCategoryMenu();
    menu.forEach((i) => {
      let subMenu: Menu[] = [];

      i.subcategory.forEach((j) => {
        let menuItem: Menu = {};

        menuItem.path =
         "/shop/collection/" + this.httpParameterEncoder.encodeKey(i.category);
        menuItem.title = j;
        menuItem.type = "link";
        subMenu.push(menuItem);
      });

      //Populate main menu with submenu
      this.menuItems.push({
        title: i.category,
        type: "sub",
        children: subMenu,
      });
    });
  }
}
