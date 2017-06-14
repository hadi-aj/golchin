import { Component } from '@angular/core';

// import { Network } from "@ionic-native/network";
// import { Keyboard } from '@ionic-native/keyboard';
// import { AppVersion } from '@ionic-native/app-version';

import { NavController, NavParams } from 'ionic-angular';

import { AuthService } from "../../providers/auth-service";
import { UserProvider } from "../../providers/user-provider";
import { UpdateService } from "../../providers/update-service";

import { HomePage } from "../home/home";

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
  providers: [
    UpdateService
    // AppVersion,
    //   Network,
    //   // Keyboard
  ]
})
export class LoginPage {

  sub: any;
  registerCredentials = { username: '', password: '' };
  networkstatus: any = '';
  hiddenFooter: boolean = false;

  // RRRR: string = 'ss;'

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private userProvider: UserProvider,
    // public appVersion: AppVersion,
    public updateService: UpdateService
    // private network: Network,
    // public keyboard: Keyboard
  ) { }

  ionViewDidLoad() {

    // appVersion.getVersionNumber().then(
    //   (number) => {
    //     this.RRRR = number;
    //     // this.updateService.check();
    //   }
    // )

    //     this.appVersion.getVersionNumber().then(
    //   (number) => {
    //     this.updateService.localVersionNumber = number;
    //     this.updateService.check();
    //   }
    // )

    this.updateService.interval = setInterval(() => {
      this.updateService.check()
    }, 5000);

    // this.updateService.interval = setInterval(() => {
    //   this.updateService.check()
    // }, 5000);

    // watch network for a disconnect
    // this.network.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    //   this.networkstatus = 'network was disconnected :-(';
    // });

    // this.network.onchange().subscribe((data) => {
    //   this.networkstatus = JSON.stringify(data);
    // } );
    // stop disconnect watch
    // disconnectSubscription.unsubscribe();

    // this.keyboard.onKeyboardHide()
    //   .subscribe(data => {
    //     this.hiddenFooter = false;
    //   });
    // this.keyboard.onKeyboardShow()
    //   .subscribe(data => {
    //     this.hiddenFooter = true;
    //   });
  }

  login() {

    // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
    //   console.log('network was disconnected :-(');
    //   this.networkstatus = 'network was disconnected :-(';
    // });
    // this.networkstatus = this.network.type;

    this.sub = this.auth.login(this.registerCredentials).then(
      data => {
        this.userProvider.setUser(data);
        if (this.userProvider.user.token) {
          this.navCtrl.setRoot(HomePage)
        }
      }
      ,
      err => {
        console.log('Login page error = ' + err)
      },
    );

  }

}
