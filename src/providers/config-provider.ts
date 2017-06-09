import { Injectable } from '@angular/core';

/*
  Generated class for the ConfigProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ConfigProvider {

  public conf = {
    // baseUrl: 'http://localhost/golchin/rest-v1',
    baseUrl: 'http://localhost:8100/api',
    imagePath: 'http://localhost/golchin/upload_dir/images',
    defaultHeaderBg: '../../assets/images/defaultHeaderBg.jpg'
  };
  constructor() {}

}
