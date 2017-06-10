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
  sub: any;
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
    this.sub = this.auth.login(this.registerCredentials).subscribe(
      data => {
        // console.log(data);
        if (data.status === 200) {
          this.userProvider.setUser(data.content);
          this.navCtrl.setRoot(HomePage)
        } else if (data.status == 401) {
          this.showError('username or pass incorrect');
        } else {
          this.showError('error ' + data.status);
        }
      },
      err => {
        if (err.status == 401) {
          this.showError('username or pass incorrect');
        }
        else {
          this.showError('error ' + err.status);
        }
      },
      () => {
        // console.log('Movie Search Complete');
        // this.showLoading
      }
    );
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      duration: 3000,
      content: "loading...",
      dismissOnPageChange: true,
    });

    this.loading.onDidDismiss(() => {
      this.sub.unsubscribe();
      console.log('Dismissed loading');
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
