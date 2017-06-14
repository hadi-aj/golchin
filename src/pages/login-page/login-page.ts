import { Component } from '@angular/core';
import { Network } from "@ionic-native/network";
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { AuthService } from "../../providers/auth-service";
import { UserProvider } from "../../providers/user-provider";
import { HomePage } from "../home/home";

@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
  providers: [
     Network
  ]
})
export class LoginPage {

  sub: any;
  registerCredentials = { username: '', password: '' };
  networkstatus: any = 'adasdas';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    private alertCtrl: AlertController,
    private userProvider: UserProvider,
    private network: Network
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');


    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.networkstatus = 'network was disconnected :-(';
    });

    // stop disconnect watch
    // disconnectSubscription.unsubscribe();
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
