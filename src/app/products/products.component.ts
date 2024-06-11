import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Product } from '../shared/models/Product';
import { ProductServices } from '../services/products/products.services';
import { CartService } from '../services/cart/cart.service';
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent {
  pruductArr: Product[] = [];
  checkedList : any[];
  currentSelected : {} | undefined;
  list : any[];
  showDropDown:boolean = false;
  constructor(
    private productServices: ProductServices,
    private cartservice: CartService
  ) {
    this.productServices.getAllProducts().then((productList: Product[]) => {
      this.pruductArr = productList;
    });
    this.checkedList = [];
    this.list = 
    [
      {name :'Discount',checked : false}
     
    ]

  }
  addCartItem(product: Product) {
    this.cartservice.addToCart(product);
  }
  getSelectedValue(status:Boolean,value:String){
    if(status){
      this.checkedList.push(value);  
    }else{
        var index = this.checkedList.indexOf(value);
        this.checkedList.splice(index,1);
    }
    
    this.currentSelected = {checked : status,name:value};

    //share checked list
   this.shareCheckedlist();
    
    //share individual selected item
   this.shareIndividualStatus();
}
shareCheckedlist(){
     this.shareCheckedList(this.checkedList);
}
shareIndividualStatus(){
   // this.shareIndividualCheckedList();
}
 shareCheckedList(item:any[]){
    console.log(item);
    console.log(this.pruductArr);
    if(item[0] == 'Discount'){
      this.pruductArr.sort((a, b) => a.discount-b.discount);

      //this.pruductArr = [];
      //console.log(this.pruductArr);
    }
    else{
      this.productServices.getAllProducts().then((productList: Product[]) => {
        this.pruductArr = productList;
      });
    }
  }
  shareIndividualCheckedList(item:{}){
    console.log(item);
  }
}
