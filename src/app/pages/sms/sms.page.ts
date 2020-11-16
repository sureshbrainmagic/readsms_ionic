import { Component, OnInit } from '@angular/core';
declare var SMSReceive: any;

@Component({
  selector: 'app-sms',
  templateUrl: './sms.page.html',
  styleUrls: ['./sms.page.scss'],
})
export class SmsPage implements OnInit {

  // sendMsg: any;
  mobNo;
  txt;
  constructor() { }

  ngOnInit() {
  }

  start() {
    SMSReceive.startWatch(
      () => {
        console.log('watch started');
        document.addEventListener('onSMSArrive', (e: any) => {
          console.log('onSMSArrive()');
          console.log(e);
          this.mobNo = e.data.address;
          this.txt = e.data.body;
          console.log(JSON.stringify(e.data));
        });
      },
      () => { console.log('watch start failed'); }
    );
  }

  stop() {
    SMSReceive.stopWatch(
      () => { console.log('watch stopped'); },
      () => { console.log('watch stop failed'); }
    );
  }

}
