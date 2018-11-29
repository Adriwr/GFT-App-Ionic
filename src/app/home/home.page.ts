import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

    loginForm: FormGroup;

    constructor(public api: RestApiService,
                public loadingController: LoadingController,
                private route: ActivatedRoute,
                public router: Router,
                private formBuilder: FormBuilder) {
        this.loginForm = this.formBuilder.group({
            'email': ['adrianEgalindoG@gmail.com', Validators.required],
            'password': ['testFrontEnd', Validators.required]
        });
    }

    ngOnInit() {
    }

    async intentLogin() {
        await this.api.postLogin(this.loginForm.value)
            .subscribe(res => {
                if (res !== '') {
                    console.log(res);
                    this.api.login(res.token);
                }
            }, (err) => {
                console.log(err);
            });
    }

}
