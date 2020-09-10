import {
  Component,
  Inject,
  HostListener,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  ElementRef,
} from "@angular/core";
import { LandingFixService } from "../../services/landing-fix.service";
import { DOCUMENT } from "@angular/common";
import { WINDOW } from "../../services/windows.service";
import { CartItem } from "../../classes/cart-item";
import { CartService } from "../../services/cart.service";
import { Observable, of } from "rxjs";
import {
  NgbModal,
  ModalDismissReasons,
  NgbModalOptions,
  NgbModalRef,
} from "@ng-bootstrap/ng-bootstrap";
import { UserModel } from "../../classes/user";
import { GlobalService } from "../../services/global.service";

declare var $: any;

@Component({
  selector: "app-header-one",
  templateUrl: "./header-one.component.html",
  styleUrls: ["./header-one.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderOneComponent implements OnInit {
  public user: UserModel;
  public shoppingCartItems: CartItem[] = [];
  public closeResult: string;
  public modalOptions: NgbModalOptions;
  public modalRef: NgbModalRef;
  @ViewChild("personalizedModal", { static: true })
  personalizedModal: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(WINDOW) private window,
    private fix: LandingFixService,
    private cartService: CartService,
    private modalService: NgbModal,
    private globalService: GlobalService
  ) {
    this.modalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true
    };
    this.user = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );
    this.cartService
      .getItems()
      .subscribe(
        (shoppingCartItems) => (this.shoppingCartItems = shoppingCartItems)
      );
  }

  ngOnInit() {
    $.getScript("assets/js/menu.js");

    if (this.user) {
      if (
        this.user.PersonalizedCategories.length == 0 ||
        this.user.PersonalizedBrands.length == 0
      ) {
        this.personalizedPopup(this.personalizedModal);
        setInterval(() => {
          this.closePopup(this.personalizedModal);
        }, 500);
      }
    }
  }

  openNav() {
    this.fix.addNavFix();
  }

  closeNav() {
    this.fix.removeNavFix();
  }

  // @HostListener Decorator
  @HostListener("window:scroll", [])
  onWindowScroll() {
    let number =
      this.window.pageYOffset ||
      this.document.documentElement.scrollTop ||
      this.document.body.scrollTop ||
      0;
    if (number >= 300) {
      this.document.getElementById("sticky").classList.add("fixed");
    } else {
      this.document.getElementById("sticky").classList.remove("fixed");
    }
  }

  // Personalized modal popup
  personalizedPopup(content) {
    this.modalRef = this.modalService.open(content,{
      windowClass: "modal-inner-container", 
    } );
    this.modalRef.result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  closePopup(content) {
    if (this.globalService.getShouldPersonalizedPopupClose()) {
      this.modalRef.close();
    }
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
