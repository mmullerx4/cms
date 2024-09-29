export class Contact {
  public id: number;
  public name: string;
  public email: string;
  public phone: number;
  public imagePath: string;


  constructor(id: number, name: string, email: string, phone: number, imagePath: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.imagePath = imagePath;
  }
}
