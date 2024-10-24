import { EventEmitter, Injectable } from '@angular/core';
import { Document } from "../documents/document.model";
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();

  private documents: Document[] = [];


  constructor() {
    this.documents = MOCKDOCUMENTS;
   }

   getDocuments() {
    return this.documents.slice();
   }

   getDocument(id: string): Document {
    for(let document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
   }


}
