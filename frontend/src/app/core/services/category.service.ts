import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

import { Category } from '@models/category.model';

import { IResponseCategory } from '@interfaces/response.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    const url = `${base_url}/category`;
    return this.http.get<IResponseCategory>(url).pipe(map((resp => resp.categories)));
  }

  getCategory(categoryID: string): Observable<Category> {
    const url = `${base_url}/category/${categoryID}`;
    return this.http.get<IResponseCategory>(url).pipe(map(resp => resp.category));
  }

}
