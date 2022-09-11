import { Website } from "./website.model";

export class User {
  constructor(
    public email: string,
    public active: boolean,
    public darkMode: boolean,
    public tour: boolean,
    public image: string,
    public name?: string,
    public lastName?: string,
    public password?: string,
    public websitesCommented?: Website[],
    public websitesSaved?: string[],
    public _id?: string,
  ) {}
}
