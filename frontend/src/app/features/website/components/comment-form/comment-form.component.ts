import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComment } from '@interfaces/comment.interface';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.css']
})
export class CommentFormComponent implements OnInit {

  @Input() website: string;

  @Output() newComment: EventEmitter<IComment> = new EventEmitter();

  stars: number = 0;
  content: string = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  auto_height(elem: any) {
    elem.style.height = "64px";
    elem.style.height = (elem.scrollHeight)+ "px";
  }

  changeStars(stars: number): void {
    if(!this.authService.isAuthenticated()) {
      return this.authService.showModalAuth('login');
    }
  }

  publish(): void {
    if(!this.authService.isAuthenticated()) {
      return this.authService.showModalAuth('login');
    }
    this.newComment.emit(this.createComment());

  }

  private createComment(): IComment {
    const newComment: IComment = {
      user: this.authService.getUserActive._id!,
      website: this.website,
      stars: this.stars,
      content: this.content.trim().length > 0 ? this.content.trim() : null
    };
    return newComment;
  }

}
