import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CutPage } from './cut';

@NgModule({
  declarations: [
    CutPage,
  ],
  imports: [
    IonicPageModule.forChild(CutPage),
  ],
  exports: [
    CutPage
  ]
})
export class CutModule {}
