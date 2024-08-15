import {Component, OnInit} from '@angular/core';
import {RecipeService} from "../recipe.service";
import {Recipe} from "../recipe.model";
import {ShoppingListService} from "../../shopping-list/shopping-list.service";
import {ActivatedRoute, Router, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit{

  recipe: Recipe =null;

  constructor(protected activatedRoute:ActivatedRoute,
              protected router:Router,
              protected recipeService: RecipeService,
              protected shoppingListService: ShoppingListService) {

  }

  onAddToShoppingList() {
    this.shoppingListService.onIngredientsAdded(this.recipe.ingredients.slice())
  }

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipe(this.activatedRoute.snapshot.params['id']*1);
    if(!this.recipe){
      this.recipe = this.recipeService.getFirstRecipe();
    }
    if(this.recipe){
      this.activatedRoute.params.subscribe(params => {
        if (params['id']!=this.recipe.id) {
          this.recipe = this.recipeService.getRecipe(params['id']*1);
        }
      })
    }

  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.activatedRoute.snapshot.params['id']*1)
    this.router.navigate(["/recipes"]);
  }
}
