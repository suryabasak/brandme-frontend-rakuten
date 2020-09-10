import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class WebService {
  readonly ROOT_URL;
  constructor(private http: HttpClient) {
    this.ROOT_URL = "http://localhost:8080";
  }

  post(uri: string, payload: Object): Observable<any> {
    return this.http.post(`${this.ROOT_URL}/${uri}`, payload);
  }

  put(uri: string, payload: Object): Observable<any> {
    return this.http.put(`${this.ROOT_URL}/${uri}`, payload);
  }
  // postImage(uri: string, payload: Object) {
  //   return this.http.post(`${this.ROOT_URL}/${uri}`, payload, { responseType: 'text' });

  // }

  // delete(uri: string) {
  //   return this.http.delete(`${this.ROOT_URL}/${uri}`);

  // }

  get(uri: string): Observable<any> {
    return this.http.get(`${this.ROOT_URL}/${uri}`);
  }

  // patch(uri: string, payload: Object) {
  //   return this.http.patch(`${this.ROOT_URL}/${uri}`, payload);

  // }
}
