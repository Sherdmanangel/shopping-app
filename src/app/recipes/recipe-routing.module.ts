import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {RecipesComponent} from "./recipes.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./recipe-start/recipe-start.component";
import {AuthGuard} from "../auth/auth.guard";



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild([
      {path:'recipes', component: RecipesComponent, children:
          [
            { path: 'new', component: RecipeEditComponent},
            { path: ':id', component: RecipeDetailComponent},
            { path: ':id/edit', component: RecipeEditComponent},
            { path: '', component: RecipeStartComponent }
          ],canActivate:[AuthGuard]},
    ])
  ]
})
export class RecipeRoutingModule { }
