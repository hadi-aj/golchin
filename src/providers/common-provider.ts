import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Subscription } from 'rxjs/Subscription';

import { Observable } from 'rxjs';
import { LoadingController, AlertController } from 'ionic-angular';

import { UserProvider } from "./user-provider";
import { ConfigProvider } from "../providers/config-provider";


@Injectable()
export class CommonProvider {

  sub: Subscription;

  constructor(
    public http: Http,
    public userProvider: UserProvider,
    public loadingCtrl: LoadingController,
    public configProvider: ConfigProvider,
    private alertCtrl: AlertController,
  ) { }


  get(
    url: string,
    body: any = '',
    authorization: boolean = true,
    headers?: Headers,
    errorMessage401: string = "لطفا دوباره وارد شوید",
    errorMessage: string = "Error"
  ) {

    // let headers = new Headers();
    let reqOption = {};
    url = this.configProvider.conf.baseUrl + url;

    if (!headers) {
      headers = new Headers();
      if (authorization) {
        headers.append('Authorization', 'Basic ' + btoa(this.userProvider.user.token + ':'));
      }
    }
    reqOption = { headers: headers };

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
          console.log('error = ' + error);
          loader.dismiss().then(() => {

            if (error.status == 401) {
              errorMessage = errorMessage401;
            } else if(error.status == 0) {
              errorMessage = "امکان ارتباط با سرور وجود ندارد" + "\n" + "لطفا اتصال اینتر نت خود را چک کنید";
            } else {
              errorMessage = errorMessage + ' ' + error.status;
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
      duration: 5000,
    });

    loader.onDidDismiss(() => {
      // if(this.sub.)
      this.sub.unsubscribe();
      // this.showAlert('خطا در اتصال به سرور');
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
