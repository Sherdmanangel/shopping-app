import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export interface RecipeData {
  id: string;
  name: string;
  description: string;
  image: number[];
  ingredients: string;
}

@Injectable({
  providedIn: 'root'
})
export class HttpclientService {
  url = 'http://localhost:8080/'

  constructor(private httpClient: HttpClient) {

  }

  //Ready
  fetchRecipes(){
     return this.httpClient
       .get<RecipeData[]>(this.url + 'api/recipes')
  }

  //Ready
  postRecipe(recipe: { image: string; name: string; description: string; ingredients: string }): Observable<any> {
     return this.httpClient.post(this.url + 'api/recipes', {
       name: recipe.name, description: recipe.description, image: (new TextEncoder().encode(recipe.image)),
      ingredients: recipe.ingredients
    });
  }

  putRecipe(recipe: {
    id: number;
    image: string;
    name: string;
    description: string;
    ingredients: string
  }): Observable<any> {
    return this.httpClient.put(this.url + `api/recipes/${recipe.id}`, {
      name: recipe.name, description: recipe.description, image: (new TextEncoder().encode(recipe.image)),
      ingredients: recipe.ingredients
    });
  }


  //Ready
  deleteRecipe(id:number){
    return this.httpClient
      .delete(this.url + `api/recipes/${id}`)
  }

  //   const recipeArray:RecipeData[] = [];
  //   for (const responseDataKey in responseData) {
  //     if(responseData.hasOwnProperty(responseDataKey)){
  //       recipeArray.push({...responseData[responseDataKey],id:responseDataKey});
  //     }
  //   }
  //   return recipeArray
  // });

}
