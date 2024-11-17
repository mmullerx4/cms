import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Contact } from "../contacts/contact.model";
//import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contactSelectedEvent = new EventEmitter<Contact>();
  contactListChangedEvent = new Subject<Contact[]>();

  private maxContactId: number;
  private contacts: Contact[] = [];



  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
 }

 getContacts(): void {
  this.http.get<{ [key: string]: Contact }>('https://cms-cont-mess-doc-default-rtdb.firebaseio.com/contacts.json')
    .subscribe(
      (contactsData: { [key: string]: Contact }) => {
        const contactsArray: Contact[] = [];
        for (const key in contactsData) {
          if (contactsData.hasOwnProperty(key)) {
            const contact = contactsData[key];
            contact.id = key;  // Firebase keys are used as contact IDs
            contactsArray.push(contact);
          }
        }
        this.contacts = contactsArray;

        this.maxContactId = this.getMaxId();

        // Sort contacts by name
        this.contacts.sort((a, b) => {
          const nameA = a.name || '';  // Fallback to empty string if name is undefined
          const nameB = b.name || '';  // Fallback to empty string if name is undefined
          return nameA.localeCompare(nameB);
        });

        this.contactListChangedEvent.next(this.contacts.slice());
      },
      (error: any) => {
        console.error('Error fetching contacts:', error);
      }
    );
}



//search contacts, return if equal to id or return null
getContact(id: string): Contact | null {
  if (!this.contacts || this.contacts.length === 0) {
    return null;
  }
  for (let contact of this.contacts) {
    if (contact.id === id) {
      return contact;
    }
  }
  return null;
}


  storeContacts() {
    const contactsCopy = JSON.stringify(this.contacts);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.put(
      'https://cms-cont-mess-doc-default-rtdb.firebaseio.com/contacts.json',
      contactsCopy, { headers: headers }
    )
    .subscribe(
      (response) => {
        console.log('Contacts successfully updated:', response);
      },
      (error) => {
        console.error('Error updating documents:', error);
      }
    );

    // Emit the updated contacts array to all subscribers
    this.contactListChangedEvent.next(this.contacts.slice());
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
    const contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }

  getMaxId(): number {
    let maxId = 0;

    if (this.contacts && this.contacts.length) {
      for (let contact of this.contacts) {
        const currentId = parseInt(contact.id, 10);
        if (currentId > maxId) {
          maxId = currentId;
        }
      }
    }
    return maxId;
  }


  addContact(newContact: Contact): void {
    if(newContact === undefined || newContact === null) {
      return;
    }
    console.log('Adding contact:', newContact);
    this.maxContactId++;
    newContact.id  = this.maxContactId.toString();
    this.contacts.push(newContact);

    //const contactsListClone = this.contacts.slice();
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if(!originalContact || !newContact) {
      return
    }
    const pos = this.contacts.indexOf(originalContact);
    if(pos < 0) {
      return;
    }

    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;

    // const contactsListClone = this.contacts.slice();
    // this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }


}
