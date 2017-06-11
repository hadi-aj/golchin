import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CommonProvider } from "./common-provider";


@Injectable()
export class DataService extends CommonProvider {

  public item: any;

  getDateTime(navCtrl: NavController) {
    let url: string = '/server/jalali-date-time';
    return this.get(navCtrl, url, {}, false);
  }

  getItem(navCtrl: NavController, barcode: number) {
    let url: string = '/item/view';
    return this.get(navCtrl, url, { barcode: barcode });
  }

  setItem(item) {
    this.item = item;
  }

  cut(navCtrl: NavController, length, orderNumber, itemId) {
    let url: string = '/cutting/cut';
    return this.get(navCtrl, url,
      {
        itemId: itemId,
        length: length,
        orderNumber: orderNumber
      }
    );
  }

  getHistory(navCtrl: NavController, itemId) {
    let url: string = '/item/history';
    return this.get(navCtrl, url,
      {
        itemId: itemId,
      }
    );
  }

}
