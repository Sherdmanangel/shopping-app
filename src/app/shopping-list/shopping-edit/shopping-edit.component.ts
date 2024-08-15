import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.css'
})
export class ShoppingEditComponent implements OnInit, OnDestroy{
  shoppEditForm: FormGroup;
  subscription: Subscription;
  editMode: boolean = false;
  index:number;
  ingredientTemp: Ingredient;

  ngOnInit(): void {
    this.shoppEditForm = new FormGroup({
      'name':  new FormControl('', [Validators.required]),
      'amount':  new FormControl('', [Validators.required]),
    })

      this.subscription = this.shoppingListService.ingredientEditEmitter.subscribe(ingredientNumber => {
      this.editMode = true;
      this.ingredientTemp=this.shoppingListService.getIngredient(ingredientNumber);
      this.index = ingredientNumber;
      this.shoppEditForm.setValue({
        'name': this.ingredientTemp.name,
        'amount': this.ingredientTemp.amount,
      })
    })
  }

  onAddItem() {
    if (this.editMode) {
      this.shoppingListService.updateingredient(this.index,this.shoppEditForm.get('name').value.toString().trim(),this.shoppEditForm.get('amount').value * 1)
    } else {
      this.shoppingListService.onIngredientsAdded(
        [new Ingredient(
          this.shoppEditForm.get('name').value.toString().trim(), this.shoppEditForm.get('amount').value * 1)]);
    }
    this.onClear();

  }
  constructor(protected shoppingListService: ShoppingListService) {
  }

  onClear() {
    this.shoppEditForm.reset()
    this.editMode=false;
  }

  onDeleteItem() {

    if (this.shoppEditForm.value['name'] && this.shoppEditForm.value['name'].toString().trim().length > 0) {
      this.shoppingListService.onIngredientsDeleted(this.shoppEditForm.value['name'].trim());
      this.onClear();
    }
    console.log(this.shoppEditForm)
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
