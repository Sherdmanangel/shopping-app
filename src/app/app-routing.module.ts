import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipesComponent} from "./recipes/recipes.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {RecipeDetailComponent} from "./recipes/recipe-detail/recipe-detail.component";
import {RecipeStartComponent} from "./recipes/recipe-start/recipe-start.component";
import {RecipeEditComponent} from "./recipes/recipe-edit/recipe-edit.component";

  const routes: Routes = [
    {path:'', redirectTo:'recipes', pathMatch:'full'},
    {path:'recipes', component: RecipesComponent, children:
    [
      { path: 'new', component: RecipeEditComponent},
      { path: ':id', component: RecipeDetailComponent},
      { path: ':id/edit', component: RecipeEditComponent},
      { path: '', component: RecipeStartComponent }
    ]},
    {path:'shopping-list', component: ShoppingListComponent},
    {path:'not-found', component: NotFoundComponent},
    {path:'**', redirectTo:'not-found'}
  ];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
