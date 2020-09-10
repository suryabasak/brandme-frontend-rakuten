import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';

@NgModule({
  exports: [ProfileMenuComponent],
  declarations: [ProfileMenuComponent],
  imports: [
    CommonModule
  ]
})
export class MeModule { }
