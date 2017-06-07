import { Injectable } from '@angular/core';
import { Http , Headers } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { User } from "../models/user";

@Injectable()
export class AuthService {


  constructor(public http: Http) {}

  login(credentials: any): Observable<User> {
    let url: string = 'http://localhost/ionic/yii2-rest/web/rest-v1/user/login';
    let headers = new Headers();
    
    headers.append('Authorization', 'Basic ' + btoa( credentials.username + ':' + credentials.password ));

    return this.http.post(url, JSON.stringify(credentials) , { headers: headers } ).map(r => r.json() as User );
  }

}
