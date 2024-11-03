import { Component } from '@angular/core';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css'
})
export class ContactEditComponent {
  name: string = '';
  phone: string = '';
  email: string = '';

  onAddContact() {
    const newContact = {
      name: this.name,
      phone: this.phone,
      email: this.email
    };
    console.log('Contact Added:', newContact);
  }





}
