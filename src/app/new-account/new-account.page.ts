import {Component, OnInit} from '@angular/core';
import {RestApiService} from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-new-account',
    templateUrl: './new-account.page.html',
    styleUrls: ['./new-account.page.scss'],
})
export class NewAccountPage implements OnInit {
    cards: any;
    newAccountForm: FormGroup;

    constructor(private api: RestApiService,
                public router: Router,
                private formBuilder: FormBuilder,
                private alertCtrl: AlertController) {
        this.newAccountForm = this.formBuilder.group({
            'card': [null, Validators.required],
            'userId' : [null, null]
        });
    }

    ngOnInit() {
        this.getCards();
    }

    async getCards() {
        await this.api.getCatalogCards()
            .subscribe(res => {
                console.log(res);
                this.cards = res.response.type_cards;
            }, err => {
                console.log(err);
            });
    }

    createAccount() {
        this.api.getToken().then(token => {
            if (token) {
                const data = this.newAccountForm.value.card;
                const decoded = this.api.getDecodedAccessToken(token);
                data.userId = decoded.id;
                console.log(data);
                this.newAccount(token, data);
            }
        });
    }

    async newAccount(token: string, data: any) {
        await this.api.postAccount(token, data)
            .subscribe(res => {
                console.log(res.success);
                /*let alert = this.alertCtrl.create({
                    title: 'Cuenta en proceso',
                    subTitle: res.success,
                    buttons: ['OK']
                });
                alert.present();*/
                this.router.navigate(['/accounts']);
            }, (err) => {
                console.log(err);
            });
    }
}
