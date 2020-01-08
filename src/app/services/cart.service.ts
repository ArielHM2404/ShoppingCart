import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
export interface Product {
  id: number;
  name: string;
  modelo: string;
  year: string;
  price: number;
  amount: number;
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  data: Product[] = [
    { id: 0, name: 'Toyota', modelo: 'Corolla', year: '2010', price: 5000.0, amount: 1 },
    { id: 1, name: 'Honda Accord', modelo: 'Accord', year: '2018', price: 25000.0, amount: 1 },
    { id: 2, name: 'Suzuki', modelo: 'Vitara', year: '2015', price: 4990.0, amount: 1 },
    { id: 3, name: 'Mercedes Benz', modelo: 'E350', year: '2015', price: 53500.0, amount: 1 },
    { id: 4, name: 'Chevrolet',modelo: 'Taho', year: '2019', price: 49190.0, amount: 1 },
    { id: 5, name: 'Ford',modelo: 'Exdpedition', year: '2008', price: 31000.0, amount: 1 },
    { id: 6, name: 'Lincoln',modelo: 'Navigator', year: '2020', price: 110000.0, amount: 1 },
    { id: 7, name: 'Mitsubishi',modelo: 'Montero', year: '2012', price: 7000.0, amount: 1 },
    { id: 8, name: 'Audi',modelo: 'S5', year: '2021', price: 52170.0, amount: 1 },
    { id: 9, name: 'Land Rover',modelo: 'Range Rover Sport SVR', year: '2020', price: 120000.0, amount: 1 },
    { id: 10, name: 'Kia',modelo: 'Sorento', year: '2020', price: 40000.0, amount: 1 },
    { id: 11, name: 'Mazda',modelo: 'CX-9', year: '2020', price: 43000.0, amount: 1 }
  ];
 
  private cart = [];
  private cartItemCount = new BehaviorSubject(0);
 
  constructor() {}
 
  getProducts() {
    return this.data;
  }
 
  getCart() {
    return this.cart;
  }
 
  getCartItemCount() {
    return this.cartItemCount;
  }
 
  addProduct(product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
  }
 
  decreaseProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount == 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }
 
  removeProduct(product) {
    for (let [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }
}
