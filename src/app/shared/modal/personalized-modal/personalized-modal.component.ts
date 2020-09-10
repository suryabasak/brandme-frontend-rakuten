import { Component, OnInit } from "@angular/core";
import { CacheService } from "../../services/cache.service";
import { CategoryMenu, Category } from "../../classes/category";
import { Brand } from "../../classes/brand";
import { AuthenticationService } from "../../services/authentication.service";
import { UserModel } from "../../classes/user";
import { GlobalService } from "../../services/global.service";

@Component({
  selector: "app-personalized-modal",
  templateUrl: "./personalized-modal.component.html",
  styleUrls: ["./personalized-modal.component.scss"],
})
export class PersonalizedModalComponent implements OnInit {
  public user: UserModel;
  public categories: Category[];
  public categoriesBackup: Category[];
  public selectedCategories: Category[] = [];
  public brands: Brand[];
  public brandsBackup: Brand[];
  public selectedBrands: Brand[] = [];
  public slideCount: number = 0;
  public currentSliderIndex: number = 0;
  public navigationButtonText: string = "Next";
  public searchKey: string = "";

  constructor(
    private cacheService: CacheService,
    private authenticationService: AuthenticationService,
    private globalService: GlobalService
  ) {
    this.getCategories();
    this.getBrandsByProduct();
  }

  ngOnInit() {
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );

    // If user detail needs to display
    if (this.user.Provider != "" && this.user.Provider != "BME") {
      this.slideCount = 3;
    } else {
      this.slideCount = 2;
    }
  }

  // Category
  async getCategories() {
    this.categories = await this.cacheService.getPrimaryCategories();
    this.categories.forEach((i) => {
      if (this.user.PersonalizedCategories.includes(i.category)) {
        i.isChecked = true;
        this.selectedCategories.push(i);
      } else {
        i.isChecked = false;
      }
    });
    this.categoriesBackup = this.categories;
  }

  // brands
  async getBrandsByProduct() {
    this.brands = await this.cacheService.getBrandsWithProduct();
    this.brands.forEach((i) => {
      if (this.user.PersonalizedBrands.includes(i.brand)) {
        i.isChecked = true;
        this.selectedBrands.push(i);
      } else {
        i.isChecked = false;
      }
    });
    this.brandsBackup = this.brands;
  }

  selectGender(gender: string) {
    this.user.Gender = gender;
  }

  afterChange(e) {
    this.currentSliderIndex = e.currentSlide;
    this.searchKey = "";

    // Insert logic based on the slide
    if (e.currentSlide == 0) {
      this.navigationButtonText = "Next";
    } else if (e.currentSlide == 1 && this.slideCount == 3) {
      this.navigationButtonText = "Next";
    } else {
      this.navigationButtonText = "Finish";
    }

    // Reset data
    this.resetData();
  }

  search(value: string, source: string) {
    // Restore data
    if (value.length <= 2) {
      this.resetData();
    } else {
      // Search Category
      if (source == "category") {
        let list = this.categoriesBackup;
        this.categories = list.filter((ele, i, arr) => {
          let arrayelement = ele.category.toLowerCase();
          return arrayelement.includes(value.toLowerCase());
        });
      }
      // Search Brand
      else if (source == "brand") {
        let list = this.brandsBackup;
        this.brands = list.filter((ele, i, arr) => {
          let arrayelement = ele.brand.toLowerCase();
          return arrayelement.includes(value.toLowerCase());
        });
      }
    }
  }

  resetData() {
    this.categories = this.categoriesBackup;
    this.brands = this.brandsBackup;
  }

  toggleCategories(category: Category) {
    if (
      this.selectedCategories.find((ele) => {
        return ele.category == category.category;
      })
    ) {
      this.selectedCategories.splice(
        this.selectedCategories.findIndex((ele) => {
          return ele.category == category.category;
        }),
        1
      );

      this.categoriesBackup.forEach((ele) => {
        if (ele.category == category.category) {
          ele.isChecked = false;
        }
      });
    } else {
      this.selectedCategories.push({ ...category });

      this.categoriesBackup.forEach((ele) => {
        if (ele.category == category.category) {
          ele.isChecked = true;
        }
      });
    }
  }

  toggleBrands(brand: Brand) {
    if (
      this.selectedBrands.find((ele) => {
        return ele.brand == brand.brand;
      })
    ) {
      this.selectedBrands.splice(
        this.selectedBrands.findIndex((ele) => {
          return ele.brand == brand.brand;
        }),
        1
      );

      this.brandsBackup.forEach((ele) => {
        if (ele.brand == brand.brand) {
          ele.isChecked = false;
        }
      });
    } else {
      this.selectedBrands.push({ ...brand });

      this.brandsBackup.forEach((ele) => {
        if (ele.brand == brand.brand) {
          ele.isChecked = true;
        }
      });
    }
  }

  finish() {
    // Save data
    if (this.slideCount == this.currentSliderIndex + 1) {
      let categoryList: string[] = [];
      let brandList: string[] = [];

      this.selectedCategories.forEach((i) => {
        categoryList.push(i.category);
      });
      this.selectedBrands.forEach((i) => {
        brandList.push(i.brand);
      });

      if (categoryList.length < 6 || brandList.length < 4) {
        alert("Please select atleast six Categories and four Brands.");
        return;
      } else if (this.user.Gender.length == 0) {
        alert("Please select your gender.");
        return;
      } else if (this.user.PhoneNumber.length == 0) {
        alert("Please enter your mobile number.");
        return;
      } else if (this.user.Age.length == 0) {
        alert("Please enter your age.");
        return;
      }

      this.navigationButtonText = "Please wait";
      this.authenticationService
        .savePersonalized(
          this.user.Username,
          categoryList.toString(),
          brandList.toString()
        )
        .subscribe(
          (res) => {
            if (res) {
              this.user.PersonalizedCategories = categoryList;
              this.user.PersonalizedBrands = brandList;
              // Save user details
              if (this.slideCount == 3) {
                this.authenticationService
                  .saveUserDetails(this.user)
                  .subscribe((res) => {
                    this.user = res;
                    localStorage.setItem(
                      "bme-shopping-user-info",
                      JSON.stringify(this.user)
                    );
                    this.globalService.setShouldPersonalizedPopupClose(true);
                  });
              } else {
                localStorage.setItem(
                  "bme-shopping-user-info",
                  JSON.stringify(this.user)
                );
                this.globalService.setShouldPersonalizedPopupClose(true);
              }
            } else {
              this.navigationButtonText = "Finish";
            }
          },
          (error) => {
            this.navigationButtonText = "Finish";
          }
        );
    }
  }

  // related slider config
  public categoryBrandSliderConfig = {
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    dots: true,
    fade: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
}
