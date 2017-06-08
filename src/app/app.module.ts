import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/http';

import { AuthService } from "../providers/auth-service";
import { UserProvider } from "../providers/user-provider";
import { DataService } from "../providers/data-service";
import { ConfigProvider } from "../providers/config-provider";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { ItemPage } from '../pages/item/item';

import { FormsModule }   from '@angular/forms';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    ItemPage,

  ],
  imports: [
    FormsModule,
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    ItemPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    UserProvider,
    DataService,
    ConfigProvider
  ]
})
export class AppModule {}
