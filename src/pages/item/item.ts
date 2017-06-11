import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { LoginPage } from "../login-page/login-page";
import { CutPage } from "../cut/cut";

import { DataService } from "../../providers/data-service";
import { ConfigProvider } from "../../providers/config-provider";

@IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  tabs: string = "detail";
  headerBg: string;
  item: any;
  history: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataService: DataService,
    private configProvider: ConfigProvider,
    public modalCtrl: ModalController
  ) {

    // Set Header Background
    this.headerBg = configProvider.conf.defaultHeaderBg;
    if (dataService.item.image !== null) {
      this.headerBg = configProvider.conf.imagePath + '/' + dataService.item.image.src;
    }

    // Set Item
    this.item = dataService.item;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad Item');
  }

  showCutPage() {
    let modal = this.modalCtrl.create(CutPage, '', {
      showBackdrop: true,
      enableBackdropDismiss: true
    });
    modal.present();
  }

  getHistory() {
    if(this.history){
      return;
    }
    this.dataService.getHistory(this.navCtrl,this.dataService.item.id).then((response) => {
      this.history = response
    },
      (error) => {
        if (error.status == 401) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    );
  }



}
