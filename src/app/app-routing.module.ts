import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorizedUsersComponent } from './layout/components/authorized-users/authorized-users.component';
import { AccountsComponent } from './layout/components/accounts/accounts.component';
import { ApprovalsComponent } from './layout/components/approvals/approvals.component';
import { HomeComponent } from './layout/components/home/home.component';
import { ProfileComponent } from './layout/components/profile/profile.component';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AdminGuard } from './guards/admin.guard';
import { LoginComponent } from './layout/components/login/login.component';
import { ErrorComponent } from './layout/components/error/error.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      {
        path: 'login', component: LoginComponent,
        canActivate: [AuthGuard]
      },
      { path: 'home', component: HomeComponent },
      { path: 'accounts', component: AccountsComponent, canActivate: [AuthGuard] },
      { path: 'approvals', component: ApprovalsComponent, canActivate: [AuthGuard, AdminGuard], canActivateChild: [AdminGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
      { path: 'secondary-users', component: AuthorizedUsersComponent, canActivate: [AuthGuard, AdminGuard], canActivateChild: [AdminGuard] },
      { path: 'error/:type', component: ErrorComponent },
      { path: '**', redirectTo: 'home' }
    ]
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
