import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

// import { AppVersion } from '@ionic-native/app-version';

import { AlertController, AlertOptions } from 'ionic-angular';

import { ConfigProvider } from "../providers/config-provider";


@Injectable()
export class UpdateService {

  // localVersionNumber;
  interval;
  url = this.configProvider.conf.updateUrl + "/version.php";

  constructor(
    public http: Http,
    // public appVersion: AppVersion,
    private alertCtrl: AlertController,
    public configProvider: ConfigProvider
  ) {
  }

  check() {
    this.http.get(this.url, { params: { version: this.configProvider.conf.localVersionNumber } }).map(r => r.json()).subscribe(
      (remote) => {
        console.log('A: ' + JSON.stringify(remote));
        if (remote.doUpdate) {
          clearInterval(this.interval);
          this.showAlert(remote); // , JSON.stringify(remote)
        }
      }
    );
  }

  showAlert(remote ) { //, m: string
    let alertOption: AlertOptions = {
      title: "بروزرسانی",
      message:  "بروزرسانی جدید موجود است",
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'بروزرسانی',
          handler: () => {
            if (remote.force) {
              this.interval = setInterval(this.check(), 10000);
            }
            window.open(this.configProvider.conf.updateUrl + "/" + remote.name, '_system', 'location=yes');
          }
        }]
    }

    if (!remote.force) {
      alertOption.buttons.push({
        text: 'بعدا'
      })
    }

    let alert = this.alertCtrl.create(alertOption);
    alert.present()
  }
}
