import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Document } from "../documents/document.model";
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  documentSelectedEvent = new EventEmitter<Document>();
  //documentChangedEvent = new EventEmitter<Document[]>();
  documentListChangedEvent = new Subject<Document[]>();


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

   //validates doc passed, abort if no, or msg not found, splice removes, emit to signal change, pass a copy
   deleteDocument(document: Document) {
    if(!document) {
      return;
    }
    const pos=this.documents.indexOf(document);
    if(pos<0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentListChangedEvent.next(this.documents.slice());
   }


}
