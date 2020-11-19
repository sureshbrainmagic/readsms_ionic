import { ToastService } from './../../services/toast/toast.service';
import { AlertFnService } from './../../services/alert/alert-fn.service';
import { Component, OnInit } from '@angular/core';
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
  constructor(
    private alert: AlertFnService,
    private toastfn: ToastService
  ) { }

  ngOnInit() {
    this.start();
  }

  start() {
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

          // console.log(sms);
          this.orgMobNo = this.getMobileNo(sms.address);
          this.txt = sms.body;
          // console.log(this.mobNo);
          // console.log(JSON.stringify(e.data, null, '\t'));
          // this.stop();
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


  getMobileNo(num) {
    if (num.includes('+91')) {
      // console.log('yes', num);
      const mechanicNumber = num.substring(3);
      return mechanicNumber;
      // this.orgMobNo = mechanicNumber;
      // console.log(mechanicNumber);
    }
  }

}
