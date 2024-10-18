import { Injectable } from '@angular/core';
import { Contact } from "../contacts/contact.model";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  constructor() { }
}
