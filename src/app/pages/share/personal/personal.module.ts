import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonalComponent } from './personal.component';
import { PersonalRoutingModule } from './personal-routing.module';
import { FormsModule } from '@angular/forms';
import { NotificationModule } from 'src/app/shared/notification.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    PersonalComponent, 
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    FormsModule,
    SharedModule,
    NotificationModule
  ]
})
export class PersonalModule { }
