import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from "../models/user";

import { ConfigProvider } from "../providers/config-provider";

@Injectable()
export class AuthService {

  constructor(public http: Http, private configProvider: ConfigProvider) { }

  login(credentials: any) {
    let url: string = this.configProvider.conf.baseUrl + '/user/login';
    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password));

    return this.http.post(url, JSON.stringify(credentials), { headers: headers })
      .map(r => {
        return { status: r.status, content: r.json() as User }
      }).catch(
      error => {
        return Observable.throw(error);
      });
  }

}
