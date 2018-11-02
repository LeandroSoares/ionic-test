import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import {
    IonicApp,
    IonicModule,
    IonicErrorHandler,
    LoadingController
} from "ionic-angular";
import { MyApp } from "./app.component";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HomePage } from "../pages/home/home";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RedditDataProvider } from "../providers/reddit-data/reddit-data";

@NgModule({
    declarations: [MyApp, HomePage],
    imports: [BrowserModule, IonicModule.forRoot(MyApp), HttpClientModule],
    bootstrap: [IonicApp],
    entryComponents: [MyApp, HomePage],
    providers: [
        StatusBar,
        SplashScreen,
        { provide: ErrorHandler, useClass: IonicErrorHandler },
        HttpClient,
        RedditDataProvider,
        LoadingController,
        InAppBrowser
    ]
})
export class AppModule {}
