import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';
  public isLoading: boolean = false;
  public invalidCredentials: boolean = false;

  constructor(private authService: UserAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.isLoading = true;
    this.invalidCredentials = false;
    if (this.username && this.password) {
      if (this.authService.validateLogin({ username: this.username, password: this.password })) {
        this.isLoading = false;
        this.invalidCredentials = false;
        this.router.navigate(['/home']);
      }
      this.isLoading = false;
      this.invalidCredentials = false;
    }
    setTimeout(() => {
      this.isLoading = false;
      this.invalidCredentials = true;
    }, 1000);
  }
}
