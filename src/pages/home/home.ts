import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { UserProvider } from "../../providers/user-provider";
import { DataService } from "../../providers/data-service";
import { ConfigProvider } from "../../providers/config-provider";
import { AuthService } from "../../providers/auth-service";

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

  profileImage: string = "assets/images/DefaultUserPhoto.png";
  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public dataService: DataService,
    private barcodeScanner: BarcodeScanner,
    private configProvider: ConfigProvider,
    private auth: AuthService,
  ) {
    if (userProvider.user.profile.image) {
      this.profileImage = configProvider.conf.imagePath + '/profile_image/' + userProvider.user.profile.image;
    }
  }

  scanBarcode(barcode: any = null) {
    if (barcode) {
      this.getItem(barcode);
    } else {
      this.barcodeScanner.scan().then((barcodeData) => {
        // alert(barcodeData.text);
        this.getItem(barcodeData.text);
        // Success! Barcode data is here
      }, (err) => {
        // An error occurred
      });
    }
  }

  getItem(barcode: any) { // 42205298
    this.dataService.getItem(barcode).then((response) => {
      if (response) {
        this.dataService.setItem(response);
        if (this.dataService.item.id) {
          this.navCtrl.push(ItemPage);
        } else {
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

  logout() {
    this.auth.logout().then(
      data => {
        // console.log('data = ' + data);
        if (data == true) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    );
  }

}
