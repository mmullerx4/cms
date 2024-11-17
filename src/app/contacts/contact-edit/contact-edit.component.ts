import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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

      if (id === undefined || id === null) {
        this.editMode = false;
        this.contact = new Contact(this.generateId(), '', '', '', '', []); // Generate ID for new contact
        return;
      }

      this.originalContact = this.contactService.getContact(id);

      if (this.originalContact === undefined || this.originalContact === null) {
        return;
      }

      this.editMode = true;
      this.contact = { ...this.originalContact };

      if (this.contact.group && Array.isArray(this.contact.group)) {
        this.groupContacts = [...this.contact.group];
      } else {
        this.groupContacts = [];
      }
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Form Submitted', this.contact);

      if (this.editMode) {
        this.contactService.updateContact(this.originalContact, this.contact);
      } else {
        if (!this.contact.id) {
          this.contact.id = this.generateId();  // Ensure ID is generated for new contact
        }
        this.contactService.addContact(this.contact);
      }

      this.router.navigate(['/contacts']);
    }
  }

  onCancel() {
    console.log('Cancel button clicked');
    this.router.navigate(['/contacts']);
  }

  onDrop(event: CdkDragDrop<any[]>) {
    const draggedContact = event.item.data;

    if (this.groupContacts.indexOf(draggedContact) === -1) {
      this.groupContacts.push(draggedContact);
      draggedContact.dropped = true;
    }
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }
    }
    return false;
  }

  addToGroup($event: any) {
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);

    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact);
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

  generateId(): string {
    // A simple function to generate a unique ID for new contacts
    return 'contact-' + Date.now();  // Example: contact-1634543212345
  }
}
