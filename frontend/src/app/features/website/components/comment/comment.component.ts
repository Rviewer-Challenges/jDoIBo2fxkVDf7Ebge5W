import { Component, Input, OnInit } from '@angular/core';
import { Comment } from '@models/comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

   @Input() comment: Comment;

  constructor() { }

  ngOnInit(): void {
  }

  get getName(): string {
    const { name, lastName, email } = this.comment.user;
    return (name && name?.length > 0) ? `${name} ${lastName || ''}` : email;
  }

}
