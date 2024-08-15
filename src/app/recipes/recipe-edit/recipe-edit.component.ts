import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css'
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  currentRecipe: Recipe;
  formRecipe: FormGroup;
  arrayGroupIngredients: FormArray
  protected formIngredients: FormGroup<any>[];


  constructor(private recipeService: RecipeService, private activedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.arrayGroupIngredients = new FormArray([])


    this.formRecipe = new FormGroup({
      'recipeName': new FormControl(null,[Validators.required]),
      'recipeDescription': new FormControl(null,Validators.required),
      'recipeImage': new FormControl(null,Validators.required),
      'ingredients': this.arrayGroupIngredients,
    })

    this.activedRoute.params.subscribe(params => {
      this.id = +params['id']
      this.editMode = params['id'] != null;

      if (this.editMode) {
        this.currentRecipe = this.recipeService.getRecipe(this.id);
        this.formRecipe.patchValue({
          'recipeName': this.currentRecipe.name,
          'recipeImage': this.currentRecipe.image,
          'recipeDescription': this.currentRecipe.description,
        });

        for (const ingredient of this.currentRecipe.ingredients) {
          const control = new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, Validators.required)
          });
          (<FormArray>this.formRecipe.get('ingredients')).push(control);
          this.formIngredients = (<FormGroup[]>this.arrayGroupIngredients.controls)
        }
      }else {
        this.formIngredients = (<FormGroup[]>this.arrayGroupIngredients.controls)
      }
    })

  }
//   nameAlreadyInUseAsync(): Promise<any> | Observable<any> {
//     const promise = new Promise<{[s:string]:boolean}>((resolve, reject) => {
//       if(this.recipeService.nameOccuped())
//       resolve()
//     })
// }
  addRecipe() {
    console.log(this.formRecipe)
    console.log(this.formIngredients)
      console.log(new Recipe(1,
        this.formRecipe.value['recipeName'].trim(),
        this.formRecipe.value['recipeDescription'].trim(),
        this.formRecipe.value['recipeImage'].trim(),
        <Ingredient[]>this.formRecipe.value['ingredients'],
      ))
      this.router.navigate(['recipes/'+this.recipeService.updateRecipe(this.recipeService.getIndexOf(this.currentRecipe),
        new Recipe(1,
          this.formRecipe.value['recipeName'].trim(),
          this.formRecipe.value['recipeDescription'].trim(),
          this.formRecipe.value['recipeImage'].trim(),
          <Ingredient[]>this.formRecipe.value['ingredients']
        ),this.editMode
      )]);
  }

  onDeleteRecipeIngredient(i: number) {
    (<FormArray>this.formRecipe.get('ingredients')).removeAt(i);
  }

  onClearImage() {
    this.formRecipe.patchValue({'recipeImage':''})
  }

  onCancel() {
    this.router.navigate(['recipes/'+this.activedRoute.snapshot.params.id]);
  }

  addIngredient() {
    console.log(this.formRecipe);
    this.arrayGroupIngredients.push(new FormGroup({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl(0, Validators.required)
    }));

    // this.formIngredients.push(new FormGroup({
    //   'name': new FormControl('', Validators.required),
    //   'amount': new FormControl(0, Validators.required)
    // }));

    console.log(this.formRecipe)
  }
}
