import { Component, OnInit } from '@angular/core';
import { Product, searchResult } from '../../../../../shared/classes/product';
import { ProductsService } from '../../../../../shared/services/products.service';
import { ActivatedRoute, Router } from "@angular/router";
import { HttpParameterEncoder } from "src/app/shared/services/http-parameter-encoder.service";


@Component({
  selector: 'app-related-products',
  templateUrl: './related-products.component.html',
  styleUrls: ['./related-products.component.scss']
})
export class RelatedProductsComponent implements OnInit {

  public products: Product[] = [];
  public name: string;
  public allItems: Product[] = [];
  public isLoading: boolean = true;

  constructor(
    private productsService: ProductsService,
    private route: ActivatedRoute,
    private httpParameterEncoder: HttpParameterEncoder
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.name = this.httpParameterEncoder.decodeValue(params["name"])
    })
    this.productsService.getProductRecommendedResult(this.name).subscribe((res: searchResult[]) => {
      if (res) {
        res.forEach((element) => {
          if (element.Product.length > 0) {
            this.allItems.push(element.Product[0]);
          }
        });
        this.products = this.allItems.slice(0, 12);
      }
      this.isLoading = false;
    },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  // related slider config
  public relatedSliderConfig = {
    infinite: false,
    speed: 300,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3
        }
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 586,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

}
