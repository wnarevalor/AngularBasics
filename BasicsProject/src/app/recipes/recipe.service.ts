import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Normal cake',
  //     'Classic cake can do in 25min',
  //     'https://image.winudf.com/v2/image/Y29tLkJlYXV0aWZ1bENha2VEZXNpZ24uc3VlZGFwcF9zY3JlZW5fMF8xNTMwOTMyMDEwXzA0MQ/screen-0.jpg?fakeurl=1&type=.jpg',
  //     [new Ingredient('Milk', 1), new Ingredient('Egg', 10)]
  //   ),
  //   new Recipe(
  //     'Pizza',
  //     'I made this pizza',
  //     'https://scontent.fbog3-2.fna.fbcdn.net/v/t31.18172-8/22135686_1723605617709828_4975863761978714954_o.jpg?_nc_cat=103&ccb=1-5&_nc_sid=2c4854&_nc_ohc=9udYZDDouhcAX9V65Ty&_nc_ht=scontent.fbog3-2.fna&oh=e43c511bf356fe14568f5e9f6d3731da&oe=618B8B64',
  //     [new Ingredient('Pepperoni', 20), new Ingredient('Queso', 100)]
  //   ),
  //   new Recipe(
  //     'Pie',
  //     'Apple pie made by mom',
  //     'https://annaspasteleria.com/images/_imageBlock/DSC_9700web.jpg',
  //     [new Ingredient('Pepperoni', 20), new Ingredient('Queso', 100)]
  //   ),
  // ];
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
