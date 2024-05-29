import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor(private apiService: ProductService) { }

  ngOnInit(): void {
  }

  fetchAccounts(): void {
    this.apiService.makeInvalidCall().subscribe((err) => {
      console.log('Account list error: ', err);
    }
    );
  }

}
