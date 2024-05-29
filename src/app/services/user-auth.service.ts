import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInterface } from '../utils/user-interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  public defaultUsersList: UserInterface[] = [
    {
      name: 'John',
      surname: 'Doe',
      email: 'john.doe@cognition.net',
      role: 'admin',
      username: 'john.doe',
      password: 'i am the admin',
      age: 43
    },
    {
      name: 'Mary',
      surname: 'Jane',
      email: 'mary.jane@cognition.net',
      role: 'user',
      username: 'mary.jane',
      password: 'i am a user',
      age: 23
    }
  ];
  private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  isUserLoggedIn$ = this.isUserLoggedIn.asObservable();

  private activeUser = new BehaviorSubject<UserInterface>({ role: '' });
  activeUser$ = this.activeUser.asObservable();

  private activeUserRole = new BehaviorSubject<string>('');
  activeUserRole$ = this.activeUserRole.asObservable();

  constructor(private router: Router) {
    this.init();
  }

  validateLogin(loginData: { username: string, password: string }): boolean {
    let validUser = this.defaultUsersList.find(user => user.username === loginData.username && user.password === loginData.password);

    console.log('validUser: ', validUser);

    if (validUser) {
      this.login(loginData);
      return true;
    }
    return false;
  }

  login(loginData: { username: string, password: string }) {
    let validUser = this.defaultUsersList.find(user => user.username === loginData.username && user.password === loginData.password);
    if (validUser) {
      sessionStorage.setItem('activeUser', JSON.stringify(validUser));
      this.isUserLoggedIn.next(true);
      this.activeUser.next(validUser);
      this.activeUserRole.next(validUser?.role);
    } else {
      this.isUserLoggedIn.next(false);
    }
  }

  logout() {
    sessionStorage.removeItem('activeUser');
    this.isUserLoggedIn.next(false);
    this.router.navigate(['/login']);
  }

  init() {
    if (!sessionStorage.getItem('usersList')) {
      sessionStorage.setItem('usersList', JSON.stringify(this.defaultUsersList));
    }

    let user = JSON.parse(sessionStorage.getItem('activeUser') as string);
    if (user && user.role !== '') {
      this.isUserLoggedIn.next(true);
      this.activeUser.next(user);
      this.activeUserRole.next(user.role);
    }
  }
}
