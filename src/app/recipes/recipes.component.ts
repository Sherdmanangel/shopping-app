import {Component, OnInit} from '@angular/core';
import {StorageService} from "../shared/storage.service";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css',
})
export class RecipesComponent implements OnInit{

  constructor(private storageService: StorageService) {

  }

  ngOnInit(): void {
    if(this.storageService.recipeSubject.value.length == 0){
      this.storageService.fetch()
    }
  }
}
