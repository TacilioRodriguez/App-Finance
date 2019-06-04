import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from 'ionic-angular/components/app/app';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  constructor(public platform: Platform, app: App){
    this.platform.ready().then(() => {
        this.platform.registerBackButtonAction(() => {
            app.navPop();
        });
    })       
  }
}


// os comandos abaixo foram removidos devido a funcionalidade do botão de voltar no inserir despesa

//constructor(public platform: Platform, app: App){
  //this.platform.ready().then(() => {
      //this.platform.registerBackButtonAction(() => {
         // app.navPop();
     // });
 // })       
//}