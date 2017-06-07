import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

import { UserProvider } from "../../providers/user-provider";
import { DataService } from "../../providers/data-service";

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
  ) {}

  showUserInfo() {
    let alert = this.alertCtrl.create({
      title: 'UserInfo',
      subTitle: this.userProvider.user.profile.name,
      buttons: ['ok']
    });
    alert.present();
  }

  getItem() {

    this.dataService.getItem(2).subscribe(
      data => {
        console.log(data.serial);
      },
      err => {
        console.log(err);
      }
    );

    // let alert = this.alertCtrl.create({
    //   title: 'UserInfo',
    //   subTitle: this.userProvider.user.profile.name,
    //   buttons: ['ok']
    // });
    // alert.present();
  }

}
