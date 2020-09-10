import { Component, OnInit, Input, Output } from "@angular/core";
import { EventEmitter } from '@angular/core'
// import { SearchComponent } from "../../../../pages/search/search.component";
import { MENUITEMS, Menu } from "./navbar-items";
import { Router, ActivatedRoute } from "@angular/router";
import { ProductsService } from "../../../../shared/services/products.service";
import { AuthenticationService } from "../../../../shared/services/authentication.service";
import { UserModel } from "../../../../shared/classes/user";
import { Category } from "../../../../shared/classes/category";
import { CacheService } from "src/app/shared/services/cache.service";
import {
  Product,
  searchResult,
  TagFilter,
} from "../../../classes/product";
import { map } from "rxjs/operators/map";
declare var $: any;


@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  public products: Product[] = [];
  public user: UserModel = new UserModel();
  public category: string = "All";
  public categories: Category[];
  searchitem: string = '';
  searchQuery : string;
  token: string;
  SearchResults: searchResult[]=[];

  public menuItems: Menu[];

  public isUserLoggedIn = false;
  // @Output() public found = new EventEmitter<any>();

  constructor(
    private cacheService: CacheService,
    private userService: ProductsService,
    private auth: AuthenticationService,
    private router: Router
  ) {
    this.menuItems = MENUITEMS.filter((menuItem) => menuItem);
    this.getCategories();
  }

  ngOnInit() {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
  }

  async getCategories() {
    this.categories = await this.cacheService.getPrimaryCategories();
  }

  filterCategory(filterVal: any) {
    console.log("Use filter in search", filterVal);
    this.category = filterVal;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl("/login");
    this.isUserLoggedIn = true;
  }
  // private saveToken(token: string): void {
  //   localStorage.setItem("searchvalue", token);
  //   this.token = token;
  // }
  // private getToken(): string {
  //   if (!this.token) {
  //     this.token = localStorage.getItem("searchvalue");
  //   }
  //   return this.token;
  // }

  doSearch () : any
   {
    debugger;
    // this.userService.getSearchResult(this.searchQuery)
    // .subscribe((res:any[])=>this.SearchResults = res)
    //   var products = this.SearchResults
    var url = '/shop/search/'+this.searchQuery
      this.router.navigate([url])
      }
    
  // getTextBoxVal(txt) {
  //   alert(txt.target.value)
  //   // this.searchitem = txt.target.value
  //   // debugger;
  //   // this.userService
  //   // .getSearchResult(this.searchitem)
  //   // .subscribe((res: any[]) => {
  //   //   this.products = res;
  // };
  // .pipe(
  //   map((val) => {
  //     localStorage.setItem("searchvalue", JSON.stringify(val));
  //     debugger;
  //     return val;
  //   })
  // );
}

