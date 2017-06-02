import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the AuthService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthService {

  // registerCredentials = { username: '', password: '' };

  constructor(public http: Http) {
    console.log('Hello AuthService Provider');
  }

  login(credentials: any) {
    return this.http.post("http://localhost/ionic/login.php" , JSON.stringify(credentials) ).map(r => r.json() );
  }

}
