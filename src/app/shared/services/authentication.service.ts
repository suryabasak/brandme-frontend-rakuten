import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators/map";
import { Router } from "@angular/router";
import { UserModel } from "../classes/user";
import { WebService } from "./web.service";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "angularx-social-login";

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  Email: string;
  Password: string;
  Firstname?: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private token: string;
  readonly ROOT_URL;
  private currentUserSubject: BehaviorSubject<true>;
  public currentUser: Observable<true>;

  constructor(
    private http: HttpClient,
    private router: Router,
    private webService: WebService,
    private authService: AuthService
  ) {
    this.ROOT_URL = "http://localhost:8080";
  }

  private saveToken(token: string): void {
    localStorage.setItem("bme-shopping-user-info", token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("bme-shopping-user-info");
    }
    return this.token;
  }

  public getUserDetails(): UserModel {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(
    method: "post" | "get",
    type: "api/user/add" | "api/user/login" | "register" | "profile",
    user?: UserModel
  ): Observable<any> {
    let base;

    if (method === "post") {
      base = this.http.post(`${this.ROOT_URL}/${type}`, user);
    } else {
      base = this.http.get(`${this.ROOT_URL}/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` },
      });
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  //Create User
  public register(user: UserModel): Observable<any> {
    return this.request("post", "api/user/add", user).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("bme-shopping-user-info", JSON.stringify(user));
        return user;
      })
    );
  }

  public login(user: UserModel): Observable<any> {
    return this.request("post", "api/user/login", user).pipe(
      map((user) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem("bme-shopping-user-info", JSON.stringify(user));
        return user;
      })
    );
  }

  public profile(): Observable<any> {
    return this.request("get", "profile");
  }

  public saveUserDetails(user: UserModel): Observable<any> {
    return this.webService.put("api/user/username", {
      Username: user.Username,
      PhoneNumber: user.PhoneNumber,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Age: user.Age,
      Gender: user.Gender,
      Address: user.Address,
      ProfileImage: user.ProfileImage,
    });
  }

  public savePersonalized(
    username: string,
    categories: string,
    brands: string
  ): Observable<any> {
    return this.webService.post("api/user/personalized", {
      Username: username,
      Categories: categories,
      Brands: brands,
    });
  }

  public logout(): void {
    let user: UserModel = JSON.parse(
      window.localStorage.getItem("bme-shopping-user-info")
    );

    if (user) {
      if (user.Provider != "" && user.Provider != "BME") {
        this.authService.signOut();
      }
      window.localStorage.removeItem("bme-shopping-user-info");
      window.localStorage.removeItem("bme-user-friends");
    }
  }
}
