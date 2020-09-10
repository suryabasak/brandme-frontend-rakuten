import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
// import { FriendsearchPipe } from './friendsearch.pipe';
import { FormsModule } from '@angular/forms';
import { CognosComponent } from './cognos/cognos.component';
import { FriendComponent } from './friend/friend.component';
import { FriendsearchPipe } from './friend/friendsearch.pipe';
import { MeModule } from 'src/app/shared/me.module';

@NgModule({
  declarations: [ProfileComponent, CognosComponent, FriendsearchPipe, FriendComponent],
  imports: [
    CommonModule,
    MeModule,
    ProfileRoutingModule,
    FormsModule
  ]
})
export class ProfileModule { }
