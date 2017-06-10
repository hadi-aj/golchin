import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { UserProvider } from "../../providers/user-provider";
import { DataService } from "../../providers/data-service";

import { ItemPage } from "../item/item";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [
    BarcodeScanner
  ]
})
export class HomePage {

  loading: Loading;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public userProvider: UserProvider,
    public dataService: DataService,
    private barcodeScanner: BarcodeScanner
  ) { }

  showUserInfo() {
    let alert = this.alertCtrl.create({
      title: 'UserInfo',
      subTitle: this.userProvider.user.profile.name,
      buttons: ['ok']
    });
    alert.present();
  }

  getItem() {
    this.showLoading();
    this.dataService.getItem(42205298).subscribe(
      data => {
        if (data.status == 200) {
          this.dataService.setItem(data.content);
          this.navCtrl.push(ItemPage);
        } else {
          this.showError('Not Found');
        }
      },
      err => {
        console.log(err);
        this.showError('Error ' + err.status);
      }
    );
  }

  scanBarcode() {
    this.barcodeScanner.scan().then((barcodeData) => {
      alert(barcodeData.text);
      // Success! Barcode data is here
    }, (err) => {
      // An error occurred
    });
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
