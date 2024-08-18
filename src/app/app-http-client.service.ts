import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Recipe} from "./recipes/recipe.model";
import {Ingredient} from "./shared/ingredient.model";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppHttpClientService {
  url = 'http://127.0.0.1:9000/'

  constructor(private httpClient: HttpClient) {

  }
  postIngredientsAdded(ingredients: Ingredient[]){
    this.httpClient.post<Ingredient[]>(this.url + 'ingredients.json', ingredients).subscribe();
  }

  fetchIngredients() : Observable<Ingredient[]> {
    return this.httpClient.get<Ingredient[]>(this.url + 'ingredients.json');
  }

  //Ready
  fetchRecipes():Observable<Recipe[]> {
    return this.httpClient.get(this.url + 'recipes.json').pipe(map((responseData:{[key:string]:Recipe}) => {
      const recipeArray:Recipe[] = [];
      for (const responseDataKey in responseData) {
        if(responseData.hasOwnProperty(responseDataKey)){
          recipeArray.push({...responseData[responseDataKey],id:responseDataKey});
        }
      }
      return recipeArray
    }));
  }
  //Ready
  postRecipe(recipe: Recipe):Observable<any>{
    return this.httpClient.post(this.url + 'recipes.json', {name:recipe.name, description:recipe.description, image:recipe.image,
      ingredients:recipe.ingredients
    });
  }
  //Ready
  putRecipes(recipes: Recipe[]):Observable<any>{
    return this.httpClient.post(this.url + 'recipes.json', recipes);
  }


  patchRecipe(recipe: Recipe):Observable<any>{
    return this.httpClient.patch(this.url + 'recipes.json', {name:recipe.name, description:recipe.description, image:recipe.image,
      ingredients:recipe.ingredients
    });
  }
}
