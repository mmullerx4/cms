import { Pipe, PipeTransform } from '@angular/core';

import { Contact } from "../contacts/contact.model";


@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {
  // The transform method returns the transformed data
  transform(contacts: Contact[], term: string): Contact[] {
    // Create a new array to contain the filtered list of contacts
    let filteredContacts: Contact[] = [];

    // Check if the term is provided and has a length > 0
    if (term && term.length > 0) {
      // Use the filter() method to check if contact's name includes the search term
      filteredContacts = contacts.filter(
        (contact: Contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

    // If the filtered array is empty, return the original contacts list
    if (filteredContacts.length < 1) {
      return contacts;
    }

    // Return the new filtered array
    return filteredContacts;
  }

}
