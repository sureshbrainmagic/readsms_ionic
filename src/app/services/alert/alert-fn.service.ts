import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Injectable({
  providedIn: 'root'
})
export class AlertFnService {

  constructor(
    private alertController: AlertController,
    ) { }

    // async existingUser(msg) {
    //   const alert = await this.alertController.create({
    //     header: 'Alert',
    //     message: msg,
    //     buttons: [
    //       {
    //         text: 'Okay',
    //         role: 'cancel',
    //         handler: () => {
    //           console.log('Confirm Cancel: blah');
    //         }
    //       },
    //       //  {
    //       //   text: 'Okay',
    //       //   handler: () => {
    //       //     localStorage.clear();
    //       //     this.storage.clear().then(() => {
    //       //       console.log('all keys are cleared');
    //       //     });
    //       //     this.router.navigateByUrl('/login');
    //       //     console.log('Confirm Okay');
    //       //   }
    //       // }
    //     ]
    //   });
    //   await alert.present();
    // }


  async msgAlertFn(msg) {
    const alert = await this.alertController.create({
      header: '',
      message: msg,
      buttons: [
        {
          text: 'Okay',
          role: 'cancel',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        },
        //  {
        //   text: 'Okay',
        //   handler: () => {
        //     localStorage.clear();
        //     this.storage.clear().then(() => {
        //       console.log('all keys are cleared');
        //     });
        //     this.router.navigateByUrl('/login');
        //     console.log('Confirm Okay');
        //   }
        // }
      ]
    });
    await alert.present();
  }

}
