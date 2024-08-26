import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {NotFoundComponent} from "./not-found/not-found.component";
import {AuthComponent} from "./auth/auth.component";

const routes: Routes = [
    {path:'', redirectTo:'recipes', pathMatch:'full'},
    {path:'auth', component: AuthComponent},
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
