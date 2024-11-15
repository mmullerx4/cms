import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  contacts: Contact[] = [];
  term: string = ''; //initialize term to an empty string


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

    search(value: string) {
      this.term = value;
    }

}
