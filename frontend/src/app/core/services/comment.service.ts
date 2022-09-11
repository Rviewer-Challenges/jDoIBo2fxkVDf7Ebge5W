import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { map, Observable } from 'rxjs';

import { Comment } from '@models/comment.model';

import { IResponseComment } from '@interfaces/response.interface';
import { IComment } from '@interfaces/comment.interface';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) {}

  getComments(websiteId: string, limit = 10, skip = 0): Observable<Comment[]> {
    const url = `${base_url}/comment/${websiteId}?limit=${limit}&skip=${skip}`;
    return this.http.get<IResponseComment>(url).pipe(map(resp => resp.comments));
  }

  createComment(comment: IComment): Observable<Comment> {
    const url = `${base_url}/comment`;
    return this.http.post<IResponseComment>(url, comment).pipe(map(resp => resp.comment));
  }

}
