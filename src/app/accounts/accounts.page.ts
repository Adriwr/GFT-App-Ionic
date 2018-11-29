import {Component, OnInit} from '@angular/core';
import {RestApiService} from '../rest-api.service';

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.page.html',
    styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {
    accounts: any;
    constructor(private api: RestApiService) {
        this.api.getToken().then(res => {
            if (res) {
                this.getAccounts(res);
            }
        });
    }

    async getAccounts(token: string) {
        await this.api.getAccounts(token)
            .subscribe(res => {
                console.log(res);
                this.accounts = res.response;
            }, err => {
                console.log(err);
            });
    }

    ngOnInit() {
    }

    logout() {
        this.api.logout();
    }
}
