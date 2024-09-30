import { Component } from '@angular/core';
import { Contact } from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent {
   contacts: Contact[] = [
     {
       id: "1",
      name: "R. Kent Jackson",
       email: "jacksonk@byui.edu",
       phone: "208-496-3771",
       imageUrl: "../../assets/images/jacksonk.jpg",
       group: null
     },
     {
       id: "2",
       name: "Rex Barzee",
       email: "barzeer@byui.edu",
       phone: "208-496-3771",
       imageUrl: "../..assets/images/jacksonk.jpg",
       group: null
     }
   ];

}
