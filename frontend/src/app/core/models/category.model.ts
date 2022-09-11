import { Resource } from "./resource.model";

export class Category {
  constructor(
    public name: string,
    public resources: Resource[],
    public _id?: string,
  ) {}
}
