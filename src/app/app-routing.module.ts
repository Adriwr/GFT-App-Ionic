import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomePageModule'
    },
    {
        path: 'newUser',
        loadChildren: './new-user/new-user.module#NewUserPageModule'
    },
    {
        path: 'accounts',
        canActivate: [AuthGuardService],
        loadChildren: './accounts/accounts.module#AccountsPageModule'
    },
    {
        path: 'newAccount',
        canActivate: [AuthGuardService],
        loadChildren: './new-account/new-account.module#NewAccountPageModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
