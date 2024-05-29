import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsComponent } from './components/accounts/accounts.component';
import { ApprovalsComponent } from './components/approvals/approvals.component';
import { AuthorizedUsersComponent } from './components/authorized-users/authorized-users.component';
import { HomeComponent } from './components/home/home.component';
import { LayoutComponent } from './layout.component';
import { ErrorComponent } from './components/error/error.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DummyComponent } from './components/dummy/dummy.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const components = [
  AuthorizedUsersComponent,
  ApprovalsComponent,
  AccountsComponent,
  HomeComponent,
  LayoutComponent,
  ErrorComponent,
  ProfileComponent,
  LoginComponent,
]

const UiModules = [
  MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatProgressSpinnerModule
]

@NgModule({
  declarations: [
    ...components,
    SidebarComponent,
    DummyComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    ...UiModules
  ],
  exports: [
    ...components
  ]
})
export class LayoutModule { }
