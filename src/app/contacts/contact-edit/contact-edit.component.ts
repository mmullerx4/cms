import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

   constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute) {}

    ngOnInit() {
      this.route.params.subscribe((params: Params) => {
        const id = params['id'];

        if ( id === undefined || id === null) {
          this.editMode = false;
          return;
        }
        this.originalContact = this.contactService.getContact(id);

        if (this.originalContact === undefined || this.originalContact === null) {
          return;
        }
        this.editMode = true;
        this.contact = {...this.originalContact};

        if (this.contact.group) {
          this.groupContacts = [...this.contact.group];
        }
      });
    }

    onSubmit(form: NgForm) {
      if (form.valid) {
        console.log('Form Submitted', this.contact);
      }
    }

    onCancel() {
      console.log('Cancel button clicked');
      this.router.navigate(['/contacts']);
    }


}
