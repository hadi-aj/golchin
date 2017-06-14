import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';


import { CommonProvider } from "./common-provider";

@Injectable()
export class AuthService extends CommonProvider {

  // constructor(public http: Http, private configProvider: ConfigProvider) { }

  login(credentials: any, errorMessage401: string = 'نام کاربری و یا رمز عبور اشتباه است') {

    let url: string = '/user/login';

    let headers = new Headers();

    headers.append('Authorization', 'Basic ' + btoa(credentials.username + ':' + credentials.password));

    return this.get(url, '', true, headers, errorMessage401);

  }
  
  logout() {
    let url = "/user/logout"
    return this.get(url);
  }

}
