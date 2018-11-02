import { NgModule } from "@angular/core";
import { IonicPageModule, Content } from "ionic-angular";
import { HomePage } from "./home";

@NgModule({
    declarations: [HomePage],
    imports: [IonicPageModule.forChild(HomePage)],
    providers: [Content]
})
export class HomePageModule {}
