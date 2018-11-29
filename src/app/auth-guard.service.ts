import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { RestApiService } from './rest-api.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

    constructor(public auth: RestApiService) {}

    canActivate(): boolean {
        return this.auth.isAuthenticated();
    }
}