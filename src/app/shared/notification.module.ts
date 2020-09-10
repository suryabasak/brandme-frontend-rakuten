import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationComponent } from '../pages/share/notification/notification.component';

@NgModule({
  exports: [NotificationComponent],
  declarations: [NotificationComponent],
  imports: [
    CommonModule
  ]
})
export class NotificationModule { } 
