import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ShareComponent } from "./share/share.component";
import { ShareRoutingModule } from "./share-routing.module";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    ShareComponent,    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ShareRoutingModule,
  ],
})
export class ShareModule {}
