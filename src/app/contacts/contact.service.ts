import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Contact } from "../contacts/contact.model";
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  private contacts: Contact[] = [];
  contactListChangedEvent = new Subject<Contact[]>();

  // assign the value of the MOCKCONTACTS variable defined in the MOCKCONTACTS.ts file to the contacts class variable in the ContactService class.
  constructor() {
    this.contacts = MOCKCONTACTS;
 }

 getContacts(): Contact[] {
  return this.contacts.slice(); //return just a copy of the contacts with the slice() so not access original
 }

//search contacts, return if equal to id or return null
  getContact(id: string): Contact | null {
    for (let contact of this.contacts) {
      if (contact.id === id) {
        return contact;
      }
    }
    return null;
  }

  deleteContact(contact: Contact): void {
    if(!contact) {
      return;
    }
    const pos=this.contacts.indexOf(contact);
    if(pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactListChangedEvent.next(this.contacts.slice());
  }


}
