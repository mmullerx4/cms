import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';



@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact;
  id: string;

  constructor(private contactService: ContactService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    //get the contact id from the route parameters
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
          this.contact = this.contactService.getContact(this.id);
        });
  }

  onDelete() {
    const confirmDelete = confirm('Are you sure you want to delete this contact?');
    if (confirmDelete) {
      this.contactService.deleteContact(this.contact);
      this.router.navigateByUrl('/contacts');
    }

  }

}
