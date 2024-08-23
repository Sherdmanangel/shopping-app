import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../../shared/recipe.model";
import {StorageService} from "../../shared/storage.service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent implements OnInit, OnDestroy {


  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  protected recipes: Recipe[] = [];
  protected recipeSubscrition: Subscription;

  constructor(protected storageService: StorageService) {  }

  ngOnDestroy(): void {
    this.recipeSubscrition.unsubscribe();
  }

  ngOnInit(): void {
    this.recipeSubscrition=this.storageService.recipeSubject.subscribe(value => {
      this.recipes = value;
    })
    this.recipes=this.storageService.recipeSubject.value;
  }
}
