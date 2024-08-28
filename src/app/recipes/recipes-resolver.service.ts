import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import {Recipe} from "../shared/recipe.model";
import {StorageService} from "../shared/storage.service";


@Injectable({ providedIn: 'root' })
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private dataStorageService: StorageService){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.dataStorageService.recipeSubject.value

    if (recipes.length === 0) {
      return recipes;
      //return this.dataStorageService.fetch();
    } else {
      return recipes;
    }
  }
}
