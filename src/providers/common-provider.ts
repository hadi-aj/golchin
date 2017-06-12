import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Observable } from 'rxjs';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

import { UserProvider } from "./user-provider";
import { ConfigProvider } from "../providers/config-provider";


@Injectable()
export class CommonProvider {

  sub: any;

  constructor(
    public http: Http,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController,
    public configProvider: ConfigProvider,
    private alertCtrl: AlertController,
  ) { }


  get( navCtrl: NavController , url, body, authorization = true, errorMessage: string = 'Error') {

    let headers = new Headers();
    let reqOption = {};
    url = this.configProvider.conf.baseUrl + url;

    if (authorization) {
      headers.append('Authorization', 'Basic ' + btoa(this.userProvider.user.token + ':'));
      reqOption = { headers: headers };
    }

    //show the loader before starting the request
    let loader = this.showLoader();

    return new Promise((resolve, reject) => {
      this.sub = this.http.post(url, JSON.stringify(body), reqOption)
        .map(res => res.json())
        .catch(
        error => {
          return Observable.throw(error);
        })
        .subscribe(data => {
          // Dismiss the loader and return response back.
          loader.dismiss().then(() => resolve(data));
        },
        (error) => {
          console.log('error');
          loader.dismiss().then(() => {
            if (error.status == 401 && navCtrl.getActive().name != 'LoginPage'  ) {
              errorMessage = "لطفا دوباره وارد شوید";
            }
            this.showAlert(errorMessage);
            return reject(error)
          });
        },

      )
    });
  }


  private showLoader() {

    let loader = this.loadingCtrl.create({
      content: "Loading...",
      duration: 3000,
    });

    loader.onDidDismiss(() => {
      this.sub.unsubscribe();
    });

    loader.present();

    return loader;
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: message,
      buttons: ['ok']
    });
    alert.present();
  }


}
