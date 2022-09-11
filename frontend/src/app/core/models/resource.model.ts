import { Category } from "./category.model";

export class Resource {
  constructor(
    public name: string,
    public description: string,
    public image: string,
    public link: string,
    public category: Category,
    public _id?: string,
  ) {}
}
