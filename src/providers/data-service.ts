import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserProvider } from "./user-provider";
import { ConfigProvider } from "../providers/config-provider";

@Injectable()
export class DataService {

  constructor(public http: Http, private userProvider: UserProvider, private configProvider: ConfigProvider) {
    console.log('Hello DataService Provider');
  }

  public item: any;

  private get(url, body, authorization = true) {

    let headers = new Headers();
    let reqOption = {};
    if (authorization) {
      headers.append('Authorization', 'Basic ' + btoa(this.userProvider.user.token + ':'));
      reqOption = { headers: headers };
    }

    return this.http.post(url, JSON.stringify(body), reqOption).map(r => {
      return { status: r.status, content: r.json() }
    }).catch(
      error => {
        return Observable.throw(error);
      });
  }

  getDateTime() {
    let url: string = this.configProvider.conf.baseUrl + '/server/jalali-date-time';
    return this.get(url, {}, false);
  }

  getItem(barcode: number) {
    let url: string = this.configProvider.conf.baseUrl + '/item/view';
    return this.get(url, { barcode: barcode });
  }

  setItem(item) {
    this.item = item;
  }

  cut(length, orderNumber , itemId) {
    let url: string = this.configProvider.conf.baseUrl + '/cutting/cut';
    return this.get(url,
      {
        itemId: itemId,
        length: length,
        orderNumber: orderNumber
      }
    );
  }

}
