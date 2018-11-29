import {Router} from '@angular/router';
import {RestApiService} from './rest-api.service';
import {Component} from '@angular/core';

import {Platform} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private api: RestApiService,
        private router: Router
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.api.authenticationState.subscribe(state => {
                if (state) {
                    this.router.navigate(['accounts']);
                } else {
                    this.router.navigate(['home']);
                }
            });
        });

    }
}
