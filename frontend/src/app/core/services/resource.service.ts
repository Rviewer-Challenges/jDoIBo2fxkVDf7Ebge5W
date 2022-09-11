import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponseResource } from '@interfaces/response.interface';
import { Resource } from '@models/resource.model';

import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(
    private http: HttpClient,
  ) {}

  getResource(resourceID: string): Observable<Resource> {
    const url = `${base_url}/resource/${resourceID}`;
    return this.http.get<IResponseResource>(url).pipe(map(resp => resp.resource));
  }

  getResources(limit = 10, skip = 0, categoryId?: string): Observable<Resource[]> {
    let url = `${base_url}/resource?limit=${limit}&skip=${skip}`;
    if(categoryId && categoryId.length === 24) url += `&category=${categoryId}`;
    return this.http.get<IResponseResource>(url).pipe(map(resp => resp.resources));
  }

}
