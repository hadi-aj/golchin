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

  getSampleItem(barcode: any) { 
      this.getItem(barcode);
  }

  scanBarcode() {    
    this.barcodeScanner.scan().then((barcodeData) => {
      // alert(barcodeData.text);
      this.getItem(barcodeData.text);
      // Success! Barcode data is here
    }, (err) => {
      // An error occurred
    });
  }

  getItem(barcode: any) { // 42205298
    this.dataService.getItem(this.navCtrl, barcode).then((response) => {
      if (response) {
        this.dataService.setItem(response);
        if(this.dataService.item.id) {
          this.navCtrl.push(ItemPage);
        }else {
          console.log('Barcode invalid ' + barcode);
        }
      }
    },
      (error) => {
        if (error.status == 401) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    );
  }


}
