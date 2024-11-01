import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  subscription: Subscription;
  contacts: Contact[] = [];


  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      });

    this.contacts = this.contactService.getContacts();
    }


    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }
    
  createNewContact() {
    //logic for creating new
  }

}
