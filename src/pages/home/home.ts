import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { UserProvider } from "../../providers/user-provider";
import { DataService } from "../../providers/data-service";

import { ItemPage } from "../item/item";
import { LoginPage } from "../login-page/login-page";

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
    public userProvider: UserProvider,
    public dataService: DataService,
    private barcodeScanner: BarcodeScanner
  ) { }

  getItem() {
    this.dataService.getItem(this.navCtrl, 42205298).then((response) => {
      if (response) {
        this.dataService.setItem(response);
        this.navCtrl.push(ItemPage);
      }
    },
      (error) => {
        if (error.status == 401) {
          this.navCtrl.setRoot(LoginPage);
        }
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

}
