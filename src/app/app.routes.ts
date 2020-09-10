import { Routes } from "@angular/router";

import { MainComponent } from "./main/main.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ErrorPageComponent } from "./pages/error-page/error-page.component";

export const rootRouterConfig: Routes = [
  {
    path: "",
    component: MainComponent,
    children: [
      {
        path: "",
        loadChildren: () =>
          import("./pages/pages.module").then((m) => m.PagesModule),
      },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },
  {
    path: 'forgetpassword',
    component: ForgetPasswordComponent
  },
  {
    path: "404",
    component: ErrorPageComponent,
  },
  {
    path: "**",
    redirectTo: "404",
  },
];
