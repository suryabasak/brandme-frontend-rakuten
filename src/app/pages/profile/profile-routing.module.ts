import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CognosComponent } from './cognos/cognos.component';
import { FriendComponent } from './friend/friend.component';


const routes: Routes = [
  {
    path: '',    
  children: [
    { path: "", redirectTo: "friend", pathMatch: "full" },
    {
      path: "friend",
      component: FriendComponent,
    },
    {
      path: "cognos",
      component: CognosComponent,
    },
  ]  
},
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
