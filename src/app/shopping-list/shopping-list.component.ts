import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit,OnDestroy{
  ingredients :Ingredient[] = []
  ingredientsRecievedObserver:Subscription;

  constructor(protected shoppingListService: ShoppingListService) {
      }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();

    this.ingredientsRecievedObserver = this.shoppingListService.ingredientAddedEmitter.subscribe(ingredientsRecieved => {
      this.ingredients = ingredientsRecieved;
    });
  }

  ngOnDestroy(): void {
    this.ingredientsRecievedObserver.unsubscribe();
  }

  onEditItem(ingredientNumber: number) {
    this.shoppingListService.ingredientEditEmitter.next(ingredientNumber);
  }
}
