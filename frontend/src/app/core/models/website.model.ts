import { Resource } from "./resource.model";

export class Website {
  constructor(
    public resource: Resource,
    public name: string,
    public description: string,
    public link: string,
    public stars: number,
    public comments: string[],
    public image?: string,
    public _id?: string,
    public inUser?: boolean,
  ) {}
}
