import { Injectable } from '@angular/core';
import {Recipe} from "./recipe.model";
import {AuthService} from "../auth/auth.service";
import {HttpclientService, RecipeData} from "./httpclient.service";
import {BehaviorSubject} from "rxjs";
import {Ingredient} from "./ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class StorageService{

  recipeSubject: BehaviorSubject<Recipe[]> = new BehaviorSubject([]);

  constructor(private httpclientService: HttpclientService, private authService: AuthService) {

  }
  //Ready
  getRecipe(id:number): Recipe {
    let a = this.recipeSubject.value.find((receta:Recipe)=>receta.id == id);
    return this.recipeSubject.value.find(value => value.id == id);
  }
  //Ready
  fetch(){this.httpclientService.fetchRecipes().subscribe(value => {
      const recipesTemp: Recipe[] = [];
      for (const recipe of value) {

        const parsedObject = JSON.parse(atob(recipe.image.toString()));
        recipesTemp.push(new Recipe(+recipe.id,recipe.name,recipe.description,
          new TextDecoder().decode(new Uint8Array(Object.values(parsedObject)))
          ,(JSON.parse(recipe.ingredients)as Ingredient[])))
      }
      this.recipeSubject.next(recipesTemp);
    });
  }
  //Ready
  postRecipe(recipe:Recipe){
    return this.httpclientService.postRecipe({name:recipe.name,description:recipe.description,image:recipe.image,ingredients:JSON.stringify(recipe.ingredients)})
  }

  updateRecipe(recipe: Recipe) {
    return this.httpclientService.putRecipe({id:recipe.id,name:recipe.name,description:recipe.description,image:recipe.image,ingredients:JSON.stringify(recipe.ingredients)})
  }
  //Ready
  deleteRecipe(id:number) {
    return this.httpclientService.deleteRecipe(id);
  }
}
