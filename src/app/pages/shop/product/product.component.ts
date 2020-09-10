import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../../../shared/classes/product";
import { CartItem } from "../../../shared/classes/cart-item";
import { ProductsService } from "../../../shared/services/products.service";
import { WishlistService } from "../../../shared/services/wishlist.service";
import { CartService } from "../../../shared/services/cart.service";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";
import { GlobalService } from "src/app/shared/services/global.service";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;

  public time: number;
  public variantImage: any = "";
  public selectedItem: any = "";
  public mySubscription: any;
  public selectedProduct: Product;

  constructor(
    private router: Router,
    public productsService: ProductsService,
    private wishlistService: WishlistService,
    private cartService: CartService,
    private globalService: GlobalService,
    private httpParameterEncoder: HttpParameterEncoder
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {}

  navigateProductDetail(name: string) {
    var encodedProductName = this.httpParameterEncoder.encodeKey(name);
    this.router.navigateByUrl(`/shop/product/${encodedProductName}`);
  }

  // Add to cart
  public addToCart(product: Product, quantity: number = 1) {
    this.cartService.addToCart(product, quantity);
  }

  // Add to compare
  public addToCompare(product: Product) {
    this.productsService.addToCompare(product);
  }

  // Add to wishlist
  public addToWishlist(product: Product) {
    this.wishlistService.addToWishlist(product);
  }

  // Change variant images
  public changeVariantImage(image) {
    this.variantImage = image;
    this.selectedItem = image;
  }

  getSelectedProduct(product) {
    this.globalService.setProduct(product);
  }
}
