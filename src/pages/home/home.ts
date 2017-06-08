import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { UserProvider } from "../../providers/user-provider";
import { DataService } from "../../providers/data-service";

import { ItemPage } from "../item/item";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    public userProvider: UserProvider,
    public dataService: DataService,
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
    this.dataService.getItem(21002692).subscribe(
      data => {
        if (data.item.id) {
          this.dataService.setItem(data);
          this.navCtrl.push(ItemPage);
        } else {
          console.log('Not Found');
        }
      },
      err => {
        console.log(err);
      }
    );
  }


}
