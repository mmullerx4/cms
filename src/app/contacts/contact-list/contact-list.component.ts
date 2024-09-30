import { Component, Input } from '@angular/core';
import { Contact } from '../contact.model'

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {
  @Input() contacts: Contact [];

  createNewContact() {
    //logic for creating new
  }


}
