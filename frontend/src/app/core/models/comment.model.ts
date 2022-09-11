import { User } from "./user.model";
import { Website } from "./website.model";

export class Comment {
  constructor(
    public content: string,
    public created: Date,
    public edited: boolean,
    public stars: number,
    public website: Website,
    public user: User,
    public _id?: string,
  ) {}
}
