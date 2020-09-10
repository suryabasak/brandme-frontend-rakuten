import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { ToastrService } from "ngx-toastr";
import {
  Product,
  LikeProduct,
  CommentAProduct,
  GetUserDetails,
  getActiveShareProducts,
  getProductByBrand,
  removeAfriend,
} from "../classes/product";
import { UserModel } from "../classes/user";
import { Category } from "../classes/category";
import { WebService } from "./web.service";
import { BehaviorSubject, Observable, of, Subscriber } from "rxjs";
import { map, filter, scan } from "rxjs/operators";
import "rxjs/add/operator/map";
//import { count } from 'console';

// Get product from Localstorage
let products = JSON.parse(localStorage.getItem("compareItem")) || [];

@Injectable()
export class ProductsService {
  public currency: string = "USD";
  public catalogMode: boolean = false;
  public compareProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer: Subscriber<{}>;
  // public likeaproduct: LikeProduct;

  // Initialize
  constructor(
    private http: Http,
    private toastrService: ToastrService,
    private webService: WebService
  ) {
    this.compareProducts.subscribe((products) => (products = products));
  }
  //Create User
  public createUser(payload: UserModel) {
    return this.webService.post("api/user/add", payload);
  }

  // // Observable Product Array
  // private products(): Observable<Product[]> {
  //    return this.http.get('assets/data/products.json').map((res:any) => res.json())
  // }
  // Observable Product Array
  public products(): Observable<any> {
    return this.webService.get("api/product/");
  }

  // Get Products
  public getMenu() {
    return this.webService.get("api/category/category/menu");
  }

  // Get Products
  public getProducts(): Observable<Product[]> {
    return this.products();
  }

  //Get Categories
  public getCategories() {
    return this.webService.get("api/category/primary");
  }

  //Get Friend List
  public getFriends(payload: string) {
    return this.webService.post("api/user/friendlist", payload);
  }

  //Get Search Result
  public getSearchResult(searchkeyword: string) {
    return this.webService.post(`api/recommendationengine/search`, {
      Search: searchkeyword,
    });
  }

  //Get Product Recommended Result
  public getProductRecommendedResult(name: string) {
    return this.webService.post(
      `api/recommendationengine/recommendedproducts`,
      {
        Search: name,
      }
    );
  }

  //Get Personalized Products
  public getPersonalizedProduct(user: UserModel): Observable<any> {
    return this.webService.post("api/recommendationengine/personalized", {
      Categories: user.PersonalizedCategories.toString(),
      Brands: user.PersonalizedBrands.toString(),
    });
  }

  //Get User Details
  public getUser(payload) {
    return this.webService.post("api/user/username", payload);
  }

  // Get Products
  public getProductsforhomepage(categories: string) {
    return this.webService.post("api/product/home/primary/category", {
      Category: categories,
    });
  }
  // Get Productsby Category
  public getProductsbycategory(payload: string) {
    return this.webService.post("api/product/primary/Shoes", payload);
  }
  // Get Productsby Category
  public getMaleCategories(payload: string) {
    return this.webService.post("api/category/primary/male", payload);
  }

  // Get Products by it's Brand
  public getProductsByBrand(name: string) {
    return this.webService.post("api/product/brand", { Brand: name });
  }

  // Get Products by Brand
  public getProductbyBrand(payload: getProductByBrand) {
    return this.webService.post("api/brand/product", payload);
  }

  //Get shared product details for personal section
  public getAllproduct(username: string) {
    return this.webService.post(`api/share/personal`, { Username: username });
  }

  // Get Products By Id
  public getProduct(id: number): Observable<Product> {
    return this.products().pipe(
      map((items) => {
        return items.find((item: Product) => {
          return item.id === id;
        });
      })
    );
  }
  // Get Products By Id
  public getProductbyId(payload) {
    return this.webService.post("api/product/name", payload);
  }
  //Share a product
  public shareAProduct(payload) {
    return this.webService.post("api/share/product", payload);
  }

  //Comment a Product
  public CommentAProduct(payload: CommentAProduct) {
    return this.webService.post("api/share/product/comment", payload);
  }

  // removeAfriend

  public removeAfriend(payload: removeAfriend) {
    return this.webService.post("api/user/friend/delete", payload);
  }

  //Get active shared product
  public getActiveshareProduct(username: string) {
    return this.webService.post(`api/share/product/active`, {
      Username: username,
    });
  }

  //Get posted shared product
  public getPostedshareProduct(username: string) {
    return this.webService.post(`api/share/product/posted`, {
      Username: username,
    });
  }

  //Like a product
  public likeaProduct(payload: LikeProduct) {
    return this.webService.post("api/share/product/like", payload);
  }

  //Disike a product
  public DislikeaProduct(payload: LikeProduct) {
    return this.webService.post("api/share/product/dislike", payload);
  }

  //get like products

  public getlikeproducts(payload: string) {
    return this.webService.post(`api/share/product/like/list`, payload);
  }

  //Get Friend by Username
  public getFriend(Username) {
    return this.webService.post("api/user/friendlist", Username);
  }

  // like count
  public likeCount(payload) {
    return this.webService.post("api/share/product/like/count", payload);
  }

  // Get Products By category
  public getProductByCategory(category: string): Observable<Product[]> {
    return this.products().pipe(
      map((items) =>
        items.filter((item: Product) => {
          if (category == "all") return item;
          else return item.category === category;
        })
      )
    );
  }
  // Get Products By category
  public getProductByCategory1(category: string): Observable<any> {
    return this.webService.post(`api/product/primary/category`, {
      Category: category,
    });
  }

  /*
     ---------------------------------------------
     ----------  Compare Product  ----------------
     ---------------------------------------------
  */

  // Get Compare Products
  public getComapreProducts(): Observable<Product[]> {
    const itemsStream = new Observable((observer) => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // If item is aleready added In compare
  public hasProduct(product: Product): boolean {
    const item = products.find((item) => item.id === product.id);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: Product): Product | boolean {
    var item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter((item) => item.id === product.id)[0];
      const index = products.indexOf(item);
    } else {
      if (products.length < 4) products.push(product);
      else this.toastrService.warning("Maximum 4 products are in compare."); // toasr services
    }
    localStorage.setItem("compareItem", JSON.stringify(products));
    return item;
  }

  // Removed Product
  public removeFromCompare(product: Product) {
    if (product === undefined) {
      return;
    }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem("compareItem", JSON.stringify(products));
  }
}
