import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { UserProvider } from "./user-provider";


@Injectable()
export class DataService {

  constructor(public http: Http, private userProvider: UserProvider) {
    console.log('Hello DataService Provider');
  }


  getItem(itemId: number) {
    let url: string = 'http://localhost/ionic/yii2-rest/web/rest-v1/item/view';

    let headers = new Headers();
    headers.append('Authorization', 'Basic ' + btoa(this.userProvider.user.token + ':'));
    
    return this.http.post(url,JSON.stringify({itemId:itemId}), { headers: headers }).map(r => r.json());
  }

}
