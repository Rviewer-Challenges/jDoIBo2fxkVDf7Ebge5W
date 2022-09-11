import { Category } from "@models/category.model";
import { Comment } from "@models/comment.model";
import { Resource } from "@models/resource.model";
import { User } from "@models/user.model";
import { Website } from "@models/website.model";

export interface IResponseCategory {
  ok: boolean,
  categories: Category[],
  category: Category
  msg?: string,
}

export interface IResponseResource {
  ok: boolean,
  resources: Resource[],
  resource: Resource
  msg?: string,
}

export interface IResponseWebsite {
  ok: boolean,
  websites: Website[],
  website: Website,
  msg?: string,
}

export interface IResponseComment {
  ok: boolean,
  comments: Comment[],
  comment: Comment,
  msg?: string,
}

export interface IResponseLogin {
  ok: boolean,
  token: string,
  user: User,
};
