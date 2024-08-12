import {Component, ElementRef, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  onAddItem() {
    if (this.nameInputRef.nativeElement.value.trim().length > 0 && this.amountInputRef.nativeElement.value.trim().length > 0) {
      this.shoppingListService.onIngredientsAdded([new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value*1)]);
      this.onClear();
    }
  }
  constructor(protected shoppingListService: ShoppingListService) {
  }

  onClear() {
    this.nameInputRef.nativeElement.value = '';
    this.amountInputRef.nativeElement.value = '';
  }

  onDeleteItem() {
    if (this.nameInputRef.nativeElement.value.trim().length > 0) {
      this.shoppingListService.onIngredientsDeleted(this.nameInputRef.nativeElement.value);
      this.onClear();
    }
  }
}
