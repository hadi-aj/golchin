import { Injectable } from '@angular/core';

import { CommonProvider } from "./common-provider";


@Injectable()
export class DataService extends CommonProvider {

  public item: any;

  getDateTime() {
    let url: string = '/server/jalali-date-time';
    return this.get(url, {}, false);
  }

  getItem(barcode: number) {
    let url: string = '/item/view';
    return this.get(url, { barcode: barcode });
  }

  setItem(item) {
    this.item = item;
  }

  cut(length, orderNumber, itemId) {
    let url: string = '/cutting/cut';
    return this.get(url,
      {
        itemId: itemId,
        length: length,
        orderNumber: orderNumber
      }
    );
  }

  getHistory(itemId) {
    let url: string = '/item/get-history';
    return this.get(url,
      {
        itemId: itemId,
      }
    );
  }

  getSame(itemId) {
    let url: string = '/item/get-same';
    return this.get(url,
      {
        itemId: itemId,
      }
    );
  }

}
