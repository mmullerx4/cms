import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact;

  contacts = [];

  createNewContact() {

  }

  constructor() {

  }

  ngOnInit() {

  }

  onContactSelected(contact: Contact) {
    this.selectedContact = contact;
  }


}
