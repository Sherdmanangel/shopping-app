import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {StorageService} from "../../shared/storage.service";
import {catchError, Observable, Subscription, throwError} from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit, OnDestroy{

  recipe: Recipe;
  id: number;

  constructor(protected activatedRoute:ActivatedRoute,
              protected router:Router,
              protected storageService: StorageService,
              protected shoppingListService: ShoppingListService) {


  }

  onAddToShoppingList() {
    this.shoppingListService.onIngredientsAdded(this.recipe.ingredients.slice())
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.storageService.getRecipe(this.id);
        }
      );

  }
  ngOnDestroy(): void {
  }
  onDeleteRecipe() {
    this.storageService.deleteRecipe(this.activatedRoute.snapshot.params['id']).pipe(
      catchError(err => {
        console.log(err)
        return throwError(err)
      })
    ).subscribe((value)=>{
      console.log(value)
      this.storageService.fetch();
      this.router.navigate(["/recipes"]);
    })
  }
}
