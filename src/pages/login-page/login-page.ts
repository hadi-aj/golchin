import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { AuthService } from "../../providers/auth-service";
import { HomePage } from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login-page',
  templateUrl: 'login-page.html',
})
export class LoginPage {

  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private auth: AuthService,
    public loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this.showLoading();
    this.auth.login().subscribe(
      data => {
        console.log(data);
        if (data.result == 1) {
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
