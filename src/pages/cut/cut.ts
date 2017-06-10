import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DataService } from "../../providers/data-service";

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

    this.dataService.getDateTime().subscribe(
      data => {
        this.date = data.content.date;
        this.time = data.content.time;
      },
      err => {
        console.log(err);
      }
    );

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
    this.dataService.cut(this.length , this.orderNumber , this.dataService.item.item.id ).subscribe(
      data => {
        if(data.content.result == true ) {
          console.log("ok");
        }else {
          console.log("Nok");
        }
      },
      error => {
          console.log("Error");
      }
    );
  }

}
