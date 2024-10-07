export class Document {
  public id: string;  //choosing to store id & phone as string
  public name: string;
  public description: string;
  public imageUrl: string;
  public children: Document[];

  constructor(id: string, name: string, description: string,  imageUrl: string, children: Document[] = []) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.children = children;
  }
}
