import { Injectable } from '@angular/core';

import { User } from "../models/user";


@Injectable()
export class UserProvider  {

  user : User;
  
  constructor() { }

  setUser(data: any) {
    this.user = Object.assign({}, data);
  }

}
