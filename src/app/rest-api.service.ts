import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const headers = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const headersCards = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZTM4Yzg0MmU4NDdhMjg3Y2I 5ODVmMiIsImVtYWlsIjoiYWxmb25zby5sb3BlekBnZnQuY29tIiwiZmlyc3RuYW1lIjoiQ Wxmb25zbyIsImxhc3RuYW1lIjoiTG9wZXoiLCJpYXQiOjE1MjUzNzc0NzcsImV4cCI6M TUyNjY3MzQ3N30.47hP8TY7Tcqc8T_Z1RFpWR0nMIyD5RkoevTN7kUyT40'
    })
};
const apiUrl = 'https://mighty-refuge-81707.herokuapp.com/api';
const TOKEN_USR = 'user-token';

@Injectable({
    providedIn: 'root'
})
export class RestApiService {
    authenticationState = new BehaviorSubject(false);

    constructor(private http: HttpClient,
                private storage: Storage) {
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // Ocurrió un error @TODO: Manejar correctamente este error
            console.error('Ha ocurrido un error:', error.error.message);
        } else {
            // Se obtuvo un código de respuesta de error
            console.error(
                `Backend regreso el código ${error.status}, ` +
                `body : ${error.error}`);
        }
        // mensaje que verá el usuario
        return throwError('Algo ha salido mal; Intente de nuevo más tarde.');
    }

    private getData(res: Response) {
        let body = res;
        return body || {};
    }

    postUser(data): Observable<any> {
        const url = `${apiUrl}/auth/user/create`;
        return this.http.post(url, data, headers)
            .pipe(
                catchError(this.handleError)
            );
    }

    postLogin(data): Observable<any> {
        const url = `${apiUrl}/auth/user/authenticate`;
        return this.http.post(url, data, headers)
            .pipe(
                catchError(this.handleError)
            );
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }

    checkToken() {
        this.storage.get(TOKEN_USR).then(res => {
            if (res) {
                this.authenticationState.next(true);
            }
        });
    }

    getToken(): Promise<any> {
        return this.storage.get(TOKEN_USR);
    }

    login(token: string) {
        this.storage.set(TOKEN_USR, token).then(() => {
            this.authenticationState.next(true);
        });
    }

    logout() {
        return this.storage.remove(TOKEN_USR).then(() => {
            this.authenticationState.next(false);
        });
    }

    isAuthenticated() {
        return this.authenticationState.value;
    }

    postAccount(token, data): Observable<any> {
        const url = `${apiUrl}/accounts`;
        return this.http.post(url, data, this.getHeadersToken(token))
            .pipe(
                catchError(this.handleError)
            );
    }

    getAccounts(token: string): Observable<any> {
        const url = `${apiUrl}/accounts`;
        return this.http.get(url, this.getHeadersToken(token)).pipe(
            map(this.getData),
            catchError(this.handleError));
    }

    getCatalogCards(): Observable<any> {
        const url = `${apiUrl}/catalogs/cards`;
        return this.http.get(url, headersCards).pipe(
            map(this.getData),
            catchError(this.handleError));
    }

    private getHeadersToken(token: string) {
        return {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'X-access-token': token
            })
        };
    }
}
