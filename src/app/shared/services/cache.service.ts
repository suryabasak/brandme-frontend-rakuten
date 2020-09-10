import { Injectable } from "@angular/core";
import { Category, CategoryMenu } from "../classes/category";
import { WebService } from "./web.service";
import { Brand } from "../classes/brand";
import { UserModel } from "../classes/user";

@Injectable()
export class CacheService {
  public user: UserModel = new UserModel();
  // Initialize
  constructor(private webService: WebService) {}

  // Get primary category
  public async getPrimaryCategories(): Promise<Category[]> {
    let categories: Category[] = [];
    var data = localStorage.getItem("bme-product-categories");
    if (data) {
      categories = JSON.parse(data);
    } else {
      let res = await this.webService.get("api/category/primary").toPromise();
      if (res.length > 0) {
        categories = res;
        localStorage.setItem(
          "bme-product-categories",
          JSON.stringify(categories)
        );
      }
    }

    return categories;
  }

  // Get category menu
  public async getCategoryMenu(): Promise<CategoryMenu[]> {
    let categoryMenu: CategoryMenu[] = [];

    var data = localStorage.getItem("bme-category-menu");
    if (data) {
      categoryMenu = JSON.parse(data);
    } else {
      let res = await this.webService.get("api/category/menu").toPromise();
      if (res.length > 0) {
        categoryMenu = res;
        localStorage.setItem("bme-category-menu", JSON.stringify(categoryMenu));
      }
    }

    return categoryMenu;
  }

  // Get brand list with product
  public async getBrandsWithProduct(): Promise<Brand[]> {
    let brands: Brand[] = [];
    var data = localStorage.getItem("bme-product-brands");
    if (data) {
      brands = JSON.parse(data);
    } else {
      let res = await this.webService
        .post("api/brand/product", { Count: "100" })
        .toPromise();
      if (res.length > 0) {
        brands = res;
        localStorage.setItem("bme-product-brands", JSON.stringify(brands));
      }
    }

    return brands;
  }

  // Get frined list of User
  public async getFriendlist(): Promise<UserModel[]> {
    let friends: UserModel[] = [];
    var data = localStorage.getItem("bme-user-friends");
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );

    if (data) {
      friends = JSON.parse(data);
    } else if (this.user) {
      let res = await this.webService
        .post("api/user/friendlist", { Username: this.user.Username })
        .toPromise();
      if (res.length > 0) {
        friends = res;
        localStorage.setItem("bme-user-friends", JSON.stringify(friends));
      }
    }

    return friends;
  }
}
