import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserAuthService } from 'src/app/services/user-auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public menuList = [
    {
      name: 'Home',
      icon: 'fa fa-home',
      link: '/home',
      default: true,
      role: []
    },
    {
      name: 'Accounts',
      icon: 'fa fa-accounts',
      link: '/accounts',
      default: false,
      role: ['admin', 'user']
    },
    {
      name: 'Profile',
      icon: 'fa fa-profile',
      link: '/profile',
      default: false,
      role: ['admin', 'user']
    },
    {
      name: 'Approvals',
      icon: 'fa fa-approvals',
      link: '/approvals',
      default: false,
      role: ['admin']
    },
    {
      name: 'Secondary Users',
      icon: 'fa fa-secondary-users',
      link: '/secondary-users',
      default: false,
      role: ['admin']
    }
  ];

  public isUserActive = false;
  public userRole = '';

  constructor(private authService: UserAuthService, private router: Router) {
    this.authService.isUserLoggedIn$.subscribe(loggedIn => {
      this.isUserActive = loggedIn
    });

    this.authService.activeUserRole$.subscribe(role => {
      this.userRole = role
    });
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout();
  }

  display(menuItem: any) {
    if (this.isUserActive) {
      return true;
    } else {
      return menuItem.default
    }
  }

  isAccessible(menuItem: any): boolean {
    if (menuItem.role.find((role: any) => role === this.userRole) || menuItem.role.length === 0) {
      return true;
    }
    return false;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

}
