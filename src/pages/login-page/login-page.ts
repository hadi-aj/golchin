import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { AuthService } from "../../providers/auth-service";
import { UserProvider } from "../../providers/user-provider";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  loading: Loading;
  registerCredentials = { username: '', password: '' };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private userProvider: UserProvider
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.showLoading();
    this.auth.login(this.registerCredentials).subscribe(
      data => {
        // console.log('data = ');
        console.log(data);
        if (data.token) {
          // this.user.email = 'XXXXXXXXXXXX';
          this.userProvider.setUser(data);
          // console.log(this.userProvider.user);
          this.navCtrl.setRoot(HomePage)
        }else {
          this.showError('username or pass incorrect');
        }
      },
      err => {
        this.showError('connection error');
      },
      () => {
        console.log('Movie Search Complete');
        this.showLoading
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: "loading...",
      dismissOnPageChange: true,
    });
    this.loading.present();
  }

  showError(message: string) {
    this.loading.dismiss();
    let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: message,
      buttons: ['ok']
    });
    alert.present();
  }

}
