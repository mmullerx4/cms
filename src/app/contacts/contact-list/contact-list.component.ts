import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contacts: Contact[] = [];

  constructor(private contactService: ContactService) {}

  //Lifecyle hook
  //call getContacts() from ContactService and assign the result to contacts array
  //Since getContacts() is returning a plain array, you don't need to subscribe. Instead directly assign the result of getContacts()
  ngOnInit() {
    this.contacts = this.contactService.getContacts();
    }

  onSelected(contact: Contact) {
    this.contactService.contactSelectedEvent.emit(contact);
  }

  createNewContact() {
    //logic for creating new
  }

}
