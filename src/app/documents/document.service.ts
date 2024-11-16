import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from "../documents/document.model";
//import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  //notify when document is selectd
  documentSelectedEvent = new EventEmitter<Document>();

  documentListChangedEvent = new Subject<Document[]>();

  private maxDocumentId: number;
  private documents: Document[] = [];


  constructor(private http: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
   }

   getDocuments() {
    //return this.documents.slice();
    return this.http
      .get<Document[]>('https://cms-cont-mess-doc-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          this.documents.sort((a, b) => a.name.localeCompare(b.name));
          this.documentListChangedEvent.next(this.documents.slice());
      },
      (error: any) => {
        console.error('Error fetching documents;', error);
      }
     );

   }

   getDocument(id: string) {
    return this.documents.find(document => document.id === id) || null;
  }


   //validates doc passed, abort if no, or msg not found, splice removes, emit to signal change, pass a copy
   deleteDocument(document: Document) {
    if(!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if(pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
   }

   getMaxId(): number {
    let maxId = 0;
    for (let document of this.documents) {
      const currentId = parseInt(document.id, 10);

      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
   }

   addDocument(newDocument: Document) {
    if(!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    this.documents.push(newDocument);

    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
   }

   updateDocument(originalDocument: Document, newDocument: Document) {
    if(!originalDocument || !newDocument) {
      return
    }
    const pos = this.documents.indexOf(originalDocument);
    if(pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;

    const documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
   }



}
