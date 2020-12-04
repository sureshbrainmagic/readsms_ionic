import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  isLoading = false;
  constructor(
    private loadingCtrl: LoadingController
  ) { }

  async present(msg) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: 'bubbles',
      message : `Send SMS to Server ...`,
      // message: msg,
      //  message : `<img src="assets/loading.gif" class="img-align" /> <br/> <div class='ion-text-center'>${msg}</div> `,
      // spinner: "bubbles",  // "bubbles" | "circles" | "circular" | "crescent" | "dots" | "lines" | "lines-small" | null | undefined
      // cssClass: 'my-custom-class',   // Write CSS in global.css
      // mode : 'ios',
      duration: 20000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }
  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

}
