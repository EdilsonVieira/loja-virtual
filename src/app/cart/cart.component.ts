import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  items;
  items_total = 0.0;
  checkoutForm;

  constructor(private cartService: CartService,
    private formBuilder: FormBuilder) {
      this.checkoutForm = this.formBuilder.group({
        name: '',
        address: ''
      });
    }

  ngOnInit() {
    this.items = this.cartService.getItems();
    for(var index in this.items)
    { 
      this.items_total += this.items[index].price;      
    }    
  }

  onSubmit(customerData) {
    // Process checkout data here
    this.items = this.cartService.clearCart();
    this.items_total = 0
    this.checkoutForm.reset();

    console.warn('Your order has been submitted', customerData);
  }

}