import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
    selector: 'app-new-user',
    templateUrl: './new-user.page.html',
    styleUrls: ['./new-user.page.scss'],
})
export class NewUserPage implements OnInit {

    newUserForm: FormGroup;

    constructor(public api: RestApiService,
                public loadingController: LoadingController,
                private route: ActivatedRoute,
                public router: Router,
                private formBuilder: FormBuilder) {
        this.newUserForm = this.formBuilder.group({
            'email': [null, Validators.required],
            'firstname': [null, Validators.required],
            'lastname': [null, Validators.required],
            'password': [null, Validators.required]
        });
    }

    ngOnInit() {
    }

    async createUser() {
        await this.api.postUser(this.newUserForm.value)
            .subscribe(res => {
                this.router.navigate(['/home']);
            }, (err) => {
                console.log(err);
            });
    }
}
