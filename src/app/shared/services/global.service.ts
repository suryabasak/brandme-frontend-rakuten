import { Injectable } from "@angular/core";
import { Product } from "../classes/product";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  public product: Product;
  public shouldPersonalizedPopupClose: boolean = false;

  // Initialize
  constructor() {}

  setProduct(product: Product) {
    this.product = product;
  }

  getProduct(): Product {
    return this.product;
  }

  setShouldPersonalizedPopupClose(status: boolean) {
    this.shouldPersonalizedPopupClose = status;
  }

  getShouldPersonalizedPopupClose(): boolean {
    return this.shouldPersonalizedPopupClose;
  }
}
