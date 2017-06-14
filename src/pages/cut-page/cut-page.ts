import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController, AlertOptions } from 'ionic-angular';

import { DataService } from "../../providers/data-service";
import { LoginPage } from "../login-page/login-page";

/**
 * Generated class for the CutPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
// @IonicPage()
@Component({
  selector: 'page-cut-page',
  templateUrl: 'cut-page.html',
})
export class CutPage {
  date: string = "";
  time: string = "";
  // fffff: {tttt : string  , rrrr: string};
  dateTime: any;
  warning: boolean = false;
  length: number;
  orderNumber: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public dataService: DataService,
    public alertCtrl: AlertController
  ) {

    this.dateTime = {
      date: "-/-/-",
      time: "-:-"
    }
    this.dataService.getDateTime().then(
      (response) => {
        this.dateTime = response;
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

  dismiss(data = {cutted : false}) {
    this.viewCtrl.dismiss(data);
  }

  cut() {
    if (this.checkBeforeCut()) {
      this.showAlert({
        title: "تایید برش",
        message: "آیا برای ثبت برش اطمینان دارید؟",
        buttons: [
          {
            text: 'بله',
            handler: () => {
              this.requestCutting()
            }
          },
          {
            text: 'خیر',
          }
        ],
      });
    }
  }

  checkBeforeCut() {
    let message = "";

    console.log("this.length = " + this.length);
    if (this.length <= 0 || !this.length ) {
      message = "مقدار برش را وارد کنید";
    }

    if (!this.orderNumber) {
      message = "شماره سفارش را وارد کنید";
    }

    if (this.dataService.item.remaining - this.length < this.dataService.item.minimumRemaining) {
      message = "امکان برش به این مقدار نیست" + "\n" + "حداقل باقیمانده باید بیشتر از " + this.dataService.item.minimumRemaining + " متر باشد";
    }

    if (message != "") {
      this.showAlert({
        title: "خطا",
        message: message,
        buttons: ['ok'],
      });
      return false;
    } else {
      return true;
    }
  }


  requestCutting() {
    this.dataService.cut(this.length, this.orderNumber, this.dataService.item.id).then(
      data => {
        this.showAlert({
          title: "تایید",
          message: "برش ثبت شد",
          buttons: [
            {
              text: 'ok',
              handler: () => {
                this.dismiss({cutted : true})
              }
            }]
        });
      },
      (error) => {
        if (error.status == 401) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    );
  }

  showAlert(alertOption: AlertOptions = {
    title: "خطا",
    message: "تایید",
    buttons: ['ok'],
  }) {
    let alert = this.alertCtrl.create(alertOption);
    alert.present()
  }

}
