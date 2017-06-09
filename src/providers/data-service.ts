import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UserProvider } from "./user-provider";
import { ConfigProvider } from "../providers/config-provider";

@Injectable()
export class DataService {

  constructor(public http: Http, private userProvider: UserProvider,private configProvider: ConfigProvider) {
    console.log('Hello DataService Provider');
  }

  public item: any;

  getItem(barcode: number) {
    let url: string =  this.configProvider.conf.baseUrl + '/item/view';

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.userProvider.user.token + ':'));
    
    return this.http.post(url,JSON.stringify({barcode:barcode}), { headers: headers }).map(r => {
        return { status: r.status, content: r.json() }
      }).catch(
      error => {
        return Observable.throw(error);
      });
  }

  setItem(item) {
    this.item = item;
  }

}
