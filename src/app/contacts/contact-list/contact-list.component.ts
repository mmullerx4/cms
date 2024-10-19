import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  //Lifecyle hook
  //call getContacts() from ContactService and assign the result to contacts array
  //Since getContacts() is returning a plain array, you don't need to subscribe. Instead directly assign the result of getContacts()
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    }

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }

  createNewContact() {
    //logic for creating new
  }

}
