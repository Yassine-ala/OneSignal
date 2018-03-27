import {Component, ViewChild} from '@angular/core';
import {NavController, Platform} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {OneSignal} from "@ionic-native/onesignal";
import {HomePage} from "../pages/home/home";
import {AboutPage} from "../pages/about/about";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav: NavController;
  rootPage = HomePage;
  deviceToken : string ;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private oneSignal: OneSignal) {
      platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      console.log(this.oneSignal.getIds());

      this.oneSignal.startInit('b203f943-82b0-42fe-bb90-09a95bb24124', '848939940445');

      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

      this.oneSignal.handleNotificationReceived().subscribe(() => {
        // do something when notification is received
      });

      this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
        // do something when a notification is opened
    /*  console.log(jsonData);
        let additionalData = jsonData.notification.payload.additionalData; */
        this.nav.push(AboutPage);

      });

      this.oneSignal.endInit();
    });
  }
}
