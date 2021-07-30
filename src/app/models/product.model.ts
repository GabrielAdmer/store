import { Category } from './category.model';

export interface Product {
  id?: number,
  name: string,
  description: string,
  price: number,
  stock: number,
  image: string,
  categories: Category[];
}

export interface CreateProduct {
  name: string,
  description: string,
  price: number,
  stock: number,
  image: string,
  categoriesIds: number[];
}

export interface ProductCart {
  id?: number,
  name: string,
  description: string,
  price: number,
  stock: number,
  image: string,
  categories: Category[];
  cuantity: number;
}
