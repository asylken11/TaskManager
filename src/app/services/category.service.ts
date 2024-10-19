import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categories: Category[] = [
    { id: 1, name: 'Sport', rank: 1 },
    { id: 2, name: 'Business', rank: 2 },
    { id: 3, name: 'Travel', rank: 1 },
    { id: 4, name: 'Education', rank: 2 },
  ];

  constructor() { }

  getCategories(): Category[] {
    return this.categories;
  }

  createCategory(category: Category): void {
    this.categories.push(category);
  }

  updateCategory(updatedCategory: Category): void {
    const index = this.categories.findIndex(cat => cat.id === updatedCategory.id);
    if (index !== -1) {
      this.categories[index] = updatedCategory;
    }
  }

  deleteCategory(id: number): void {
    this.categories = this.categories.filter(cat => cat.id !== id);
  }
}
