import { LoaderService } from './../../services/loader/loader.service';
import { ConfigService } from './../../services/config/config.service';
import { ToastService } from './../../services/toast/toast.service';
import { AlertFnService } from './../../services/alert/alert-fn.service';
import { Component, OnInit } from '@angular/core';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
declare var SMSReceive: any;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {

  mobNo: string = '';
  txt = '';
  orgMobNo;
  isSMS: boolean = true;
  constructor(
    private alert: AlertFnService,
    private toastfn: ToastService,
    private androidPermissions: AndroidPermissions,
    private config: ConfigService,
    private loader: LoaderService
  ) { }

  ngOnInit() {
    // this.start();
  }

  ionViewDidEnter() {
    this.getSMSReadWritePermission();
  }

  getSMSReadWritePermission() {
    console.log('permission');
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.READ_SMS).then(
      success => console.log('Permission granted'),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_SMS)
    );
    this.androidPermissions.requestPermissions(
      [
        this.androidPermissions.PERMISSION.READ_SMS,
        // this.androidPermissions.PERMISSION.VIEW_SMS
      ]
    );


  }

  start() {
    this.isSMS = false;
    SMSReceive.startWatch(
      () => {
        console.log('watch started');
        document.addEventListener('onSMSArrive', (e: any) => {
          console.log('onSMSArrive()');
          // console.log(e);
          // this.mobNo = e.data.address;
          // this.txt = e.data.body;
          // console.log(this.mobNo);
          // console.log(this.txt);
          // alert(this.mobNo);
          // alert(this.txt);
          // this.assignValue(e.data);
          const sms: any = e.data;
          this.toastfn.toastFn(`You have received new sms from ${sms.address}`);
          this.alert.msgAlertFn(`Mobile : ${sms.address}, content : ${sms.body}`);
          this.getMobileNo(sms);
        });
      },
      () => { console.log('watch start failed'); }
    );
    console.log(this.mobNo);
  }

  stop() {
    SMSReceive.stopWatch(
      () => { console.log('watch stopped'); },
      () => { console.log('watch stop failed'); }
    );
  }


  getMobileNo(obj) {
    if (obj.address.includes('+91')) {
      const mechanicNumber = obj.address.substring(3);
      this.orgMobNo = mechanicNumber;
      this.txt = obj.body;
      this.sendSMS();
    }
  }

  sendSMS() {
    this.loader.present(`Please Wait ...`);
    const values = {
      "smsContent": this.txt,
      "mobileNo": this.orgMobNo,
    };
    this.config.postData(`api/Loyalty_Gates/addCouponCode`, values).subscribe(res => {
      console.log(res);
      const response: any = res;
      this.loader.dismiss();
    }, error => {
      console.log(error);
      this.loader.dismiss();
    });
  }

}
