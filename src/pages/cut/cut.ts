import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DataService } from "../../providers/data-service";
import { LoginPage } from "../login-page/login-page";

@IonicPage()
@Component({
  selector: 'page-cut',
  templateUrl: 'cut.html',
})
export class CutPage {

  date: string = "";
  time: string = "";
  alert: boolean = true;
  length: number = 0;
  orderNumber: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public dataService: DataService,
  ) {

    // this.dataService.getDateTime().subscribe(
    //   data => {
    //     this.date = data.content.date;
    //     this.time = data.content.time;
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Cut');
  }

  increment() {
    this.length = this.length + 1;
  }
  decrement() {
    this.length -= 1;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  cut() {
    this.dataService.cut(this.navCtrl, this.length, this.orderNumber, this.dataService.item.item.id).then(
      data => {
        if (data) {
          console.log("ok");
        } else {
          console.log("Nok");
        }
      },
      error => {
        console.log("Error");
        if (error.status == 401) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    );
  }

}
