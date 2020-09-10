import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActiveComponent } from "./active.component";
import { ActiveRoutingModule } from "./active-routing.module";
import { ReceivedComponent } from "./received/received.component";
import { PostedComponent } from "./posted/posted.component";
import { SlickCarouselModule } from "ngx-slick-carousel";
import { FormsModule } from "@angular/forms";
import { CountdownModule, CountdownGlobalConfig } from "ngx-countdown";
import { NotificationModule } from "src/app/shared/notification.module";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  declarations: [ActiveComponent, ReceivedComponent, PostedComponent],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    SlickCarouselModule,
    FormsModule,
    CountdownModule,
    SharedModule,
    NotificationModule,
  ],
  providers: [{ provide: CountdownGlobalConfig }],
})
export class ActiveModule {}
