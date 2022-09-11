import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

import Storage from '@utils/storage.util';

import { Website } from '@models/website.model';

import { IParams } from '@interfaces/params.interface';
import { IResponseWebsite } from '@interfaces/response.interface';
import { AuthService } from './auth.service';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class WebsiteService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  get headers() {
    return {
      headers: {
        'x-token': Storage.getItem('x-token'),
      },
    };
  }

  getWebsites(limit = 10, skip = 0): Observable<Website[]> {
    const url = `${base_url}/website?limit=${limit}&skip=${skip}`;
    return this.http.get<IResponseWebsite>(url).pipe(map(resp => this.mapWebsitesUser(resp.websites) as Website[]));
  }

  getWebsitesByResource(resourceID: string, { limit = 10, skip = 0, search }: IParams): Observable<Website[]> {
    let url = `${base_url}/website/resource/${resourceID}?limit=${limit}&skip=${skip}`;
    if(search && search.trim().length > 0) {
      url += `&search=${search}`;
    }
    return this.http.get<IResponseWebsite>(url).pipe(map(resp => this.mapWebsitesUser(resp.websites) as Website[]));
  }

  getWebsite(websiteId: string): Observable<Website> {
    const url = `${base_url}/website/${websiteId}`;
    return this.http.get<IResponseWebsite>(url).pipe(map(resp => this.mapWebsitesUser(resp.website) as Website));
  }

  getWebsitesSaved(skip: number = 0, limit: number = 10): Observable<Website[]> {
    const url = `${base_url}/website/saved?skip=${skip}&limit=${limit}`;
    return this.http.get<IResponseWebsite>(url, this.headers).pipe(map(resp => this.mapWebsitesUser(resp.websites) as Website[]));
  }

  private mapWebsitesUser(websites: Website[] | Website): Website[] | Website {
    const userActive = this.authService.getUserActive;
    if(userActive) {
      const { websitesSaved } = userActive;
      if(Array.isArray(websites)) {
        websites.map(website => website.inUser = websitesSaved?.includes(website._id!))
      } else {
        websites.inUser = websitesSaved?.includes(websites._id!);
      }
    }
    return websites;
  }

}