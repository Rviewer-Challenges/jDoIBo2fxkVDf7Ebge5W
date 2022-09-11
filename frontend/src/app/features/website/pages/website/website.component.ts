import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin, Observable, Subscription } from 'rxjs';

import { Comment } from '@models/comment.model';
import { Website } from '@models/website.model';
import { IComment } from '@interfaces/comment.interface';

import { AuthService } from '@services/auth.service';
import { CommentService } from '@services/comment.service';
import { WebsiteService } from '@services/website.service';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  website: Website;
  comments: Comment[];
  isAuthenticated: boolean = false;
  commentBefore: boolean = false;
  private authSub: Subscription;
  private skip: number = 0;
  private limit: number = 10;
  constructor(
    private readonly websiteService: WebsiteService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly commentService: CommentService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.activatedRoute.params.subscribe(({ websiteId }) => websiteId ? this.loadData(websiteId) : this.router.navigate(['/']));
    this.authSub = this.authService.isAuthenticatedEmitter.subscribe(({isAuth}) =>{
      if(isAuth) {
        this.isAuthenticated = true;
        this.commentBefore = this.authService.commentBefore(this.website._id!);
      }
    });
  }

  loadData(websiteId: string): void {
    forkJoin({
      website: this.websiteService.getWebsite(websiteId),
      comments: this.getComments(websiteId),
    }).subscribe({
      next: ({ website, comments }) => {
        this.website = website;
        console.log({website});
        this.comments = comments;
      },
      complete: () => {
        if(this.isAuthenticated) {
          this.commentBefore = this.authService.commentBefore(this.website._id!);
        }
        this.isLoading = false;
      }
    });
  }

  private getComments(websiteId: string): Observable<Comment[]> {
    return this.commentService.getComments(websiteId, this.limit, this.skip);
  }

  createComment(comment: IComment) {
    this.commentService.createComment(comment).subscribe({
      next: (comment) => {
        this.commentBefore = true;
        this.comments.push(comment);
        console.log(this.comments);
      }
    })
  }

}
