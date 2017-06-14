import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { LoginPage } from "../login-page/login-page";
import { CutPage } from '../cut-page/cut-page';

import { DataService } from "../../providers/data-service";
import { ConfigProvider } from "../../providers/config-provider";

// @IonicPage()
@Component({
  selector: 'page-item',
  templateUrl: 'item.html',
})
export class ItemPage {

  tabs: string = "detail";
  headerBg: string;
  item: any;
  history: any;
  same: any;

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
    modal.onDidDismiss((data) => {
      // اگر برش خورده بود داده ها رو آپدیت کن
      if (data.cutted) {
        this.history = null;
        // reload history
        this.getHistory();
        // update Item after cut it
        this.updateItem();
      }
    });

    modal.present();
  }

  getHistory() {
    if (this.history) {
      return;
    }
    this.dataService.getHistory( this.dataService.item.id).then((response) => {
      this.history = response
    },
      (error) => {
        if (error.status == 401) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    );
  }

  getSame() {
    if (this.same) {
      return;
    }
    this.dataService.getSame( this.dataService.item.id).then((response) => {
      this.same = response
    },
      (error) => {
        if (error.status == 401) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    );
  }

  // update Item after cut it
  updateItem() {
    this.dataService.getItem( this.dataService.item.barcode).then((response) => {
      if (response) {
        this.dataService.setItem(response);
        // Update Item
        this.item = this.dataService.item;
      }
    },
      (error) => {
        if (error.status == 401) {
          this.navCtrl.setRoot(LoginPage);
        }
      }
    );
  }

}
