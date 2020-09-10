import { Injectable } from "@angular/core";
import { WebService } from "./web.service";
import { Observable } from "rxjs";

@Injectable()
export class ShareService {
  // Initialize
  constructor(private webService: WebService) {}

  // Get notification
  public getNotification(username: string): Observable<any> {
    return this.webService.post("api/share/notification", {
      Username: username,
    });
  }
  
  //Share a product
  public shareAProduct(payload) {
    return this.webService.post("api/share/product", payload);
  }
}
