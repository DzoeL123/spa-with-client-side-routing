import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  constructor() {
    // alert('You dont have permission to access this page. Kindly contact the administrator.')
  }

  ngOnInit(): void {
  }

}
