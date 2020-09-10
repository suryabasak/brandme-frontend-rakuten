import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product } from "../../../../../shared/classes/product";
import { UserModel } from "../../../../../shared/classes/user";
import { ProductsService } from "../../../../../shared/services/products.service";
import { WishlistService } from "../../../../../shared/services/wishlist.service";
import { CartService } from "../../../../../shared/services/cart.service";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";
import { Observable, of } from "rxjs";
import * as $ from "jquery";

@Component({
  selector: "app-product-left-sidebar",
  templateUrl: "./product-left-sidebar.component.html",
  styleUrls: ["./product-left-sidebar.component.scss"],
})
export class ProductLeftSidebarComponent implements OnInit {
  public product: Product = {};
  public products: Product[] = [];
  public counter: number = 1;
  public selectedSize: any = "";
  public user: UserModel = new UserModel();
  public friends: UserModel[];
  public time: number;
  public name: string;
  public iStyle = "width:100%; height:100%;";
  public varientURL: string;
  mySubscription: any;
  //@ViewChild('closebutton') closebutton;
  //Get Product By Id
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public productsService: ProductsService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private httpParameterEncoder: HttpParameterEncoder
  ) {
    this.route.params.subscribe((params) => {
      this.name = this.httpParameterEncoder.decodeValue(params["name"]);

      this.productsService
        .getProductbyId({ Name: this.name })
        .subscribe((product) => {
          this.product = product[0];
          this.varientURL = this.product.variants[0].url;
        });
    });
    // this.mySubscription = this.router.events.subscribe((event) => {
    //   if (event instanceof onanimationend) {
    //     // Trick the Router into believing it's last link wasn't previously loaded
    //     this.router.navigated = false;
    //   }
    // });
  }
  // ngOnDestroy() {
  //   if (this.mySubscription) {
  //     this.mySubscription.unsubscribe();
  //   }
  // }

  ngOnInit() {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    if (this.user) {
      this.GetFriends();
    }
  }

  // product zoom
  onMouseOver(): void {
    document.getElementById("p-zoom").classList.add("product-zoom");
  }

  onMouseOut(): void {
    document.getElementById("p-zoom").classList.remove("product-zoom");
  }

  public slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
  };

  public slideNavConfig = {
    vertical: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".product-slick",
    arrows: false,
    dots: false,
    focusOnSelect: true,
  };

  public increment() {
    this.counter += 1;
  }

  public decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  public chooseVarients(image: string) {
    let varient = this.product.variants.filter((p) => {
      return p.images == image;
    });
    this.varientURL = varient[0].url;
  }

  // For mobile filter view
  public mobileSidebar() {
    $(".collection-filter").css("left", "-15px");
  }

  // Add to cart
  public addToCart(product: Product, quantity) {
    if (quantity == 0) return false;
    this.cartService.addToCart(product, parseInt(quantity));
  }

  // Add to cart
  public buyNow(product: Product, quantity) {
    //if (quantity > 0) this.cartService.addToCart(product, parseInt(quantity));
    //this.router.navigate(["/home/checkout"]);
    window.open(this.varientURL, "_blank");
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
  }

  // Change size variant
  public changeSizeVariant(variant) {
    this.selectedSize = variant;
  }

  GetFriends() {
    this.productsService
      .getFriend({ Username: this.user.Username })
      .subscribe((res: any[]) => {
        this.friends = res;
      });
  }
  // GetPersonalShares() {
  //   this.productsService
  //     .getAllproduct(this.user.Username)
  //     .subscribe((res: any[]) => (this.products = res));
  // }

  getSelectedProduct(product) {
    this.product = product;
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
          debugger;
          //this.product = null;
          this.friends.forEach((friend) => {
            friend.isChecked = false;
          });
          this.time = 0;
          //this.GetFriends();
          //this.closebutton.nativeElement.click();
          //this.GetPersonalShares();
        }
      },
      (err) => {
        console.error(err);
      }
    );

    // var element = document.getElementById("CloseButton") as any;
    // element.click();
  }
}
