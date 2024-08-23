import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../../shared/recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {StorageService} from "../../shared/storage.service";

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


  constructor(private storageService: StorageService, private activedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.arrayGroupIngredients = new FormArray([])


    this.formRecipe = new FormGroup({
      'recipeName': new FormControl(null,[Validators.required]),
      'recipeDescription': new FormControl(null,Validators.required),
      'recipeImage': new FormControl(null),
      'ingredients': this.arrayGroupIngredients,
    })

    this.activedRoute.params.subscribe(params => {
      this.id = params['id']
      this.editMode = params['id'] != null;

      if (this.editMode) {
        this.currentRecipe = this.storageService.getRecipe(this.id);
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
  addRecipe() {
      // this.router.navigate(['recipes/'+this.storageService.updateRecipe(this.storageService.getIndexOf(this.currentRecipe),
      //   new Recipe(undefined,
      //     this.formRecipe.value['recipeName'].trim(),
      //     this.formRecipe.value['recipeDescription'].trim(),
      //     this.formRecipe.value['recipeImage'].trim(),
      //     <Ingredient[]>this.formRecipe.value['ingredients']
      //   ),this.editMode
      // )]);

    if (this.editMode) {
      this.storageService.updateRecipe(new Recipe(
        this.id,
        this.formRecipe.value['recipeName'].trim(),
        this.formRecipe.value['recipeDescription'].trim(),
        (this.formRecipe.value['recipeImage'] && this.formRecipe.value['recipeImage'].length>0)? this.formRecipe.value['recipeImage'].trim():null,
        <Ingredient[]>this.formRecipe.value['ingredients']))
        .subscribe(value => {
          console.log(value)
          this.router.navigate([`/recipes/${this.id}`]);
        });
    }else {
      this.storageService.postRecipe(new Recipe(
        undefined,
        this.formRecipe.value['recipeName'].trim(),
        this.formRecipe.value['recipeDescription'].trim(),
        (this.formRecipe.value['recipeImage'] && this.formRecipe.value['recipeImage'].length>0)? this.formRecipe.value['recipeImage'].trim():null,
        <Ingredient[]>this.formRecipe.value['ingredients']))
          .subscribe(value => {
            console.log(value)
            console.log(value['id'])
            this.router.navigate(['/recipes']);
      });
    }
  }

  onDeleteRecipeIngredient(i: number) {
    (<FormArray>this.formRecipe.get('ingredients')).removeAt(i);
  }

  onClearImage() {
    this.formRecipe.patchValue({'recipeImage':null})
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

    console.log(this.formRecipe)
  }
}
