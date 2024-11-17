import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Document } from "../documents/document.model";


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  // Notify when document is selected
  documentSelectedEvent = new EventEmitter<Document>();
  documentListChangedEvent = new Subject<Document[]>();

  private maxDocumentId: number;
  private documents: Document[] = [];


  constructor(private http: HttpClient) {
    // this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
  }

  getDocuments() {
    return this.http.get<Document[]>('https://cms-cont-mess-doc-default-rtdb.firebaseio.com/documents.json')
      .subscribe(
        (documents: Document[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();

          // Ensure `name` exists before calling localeCompare
          this.documents.sort((a, b) => {
            const nameA = a.name || '';  // Fallback to empty string if name is undefined
            const nameB = b.name || '';  // Fallback to empty string if name is undefined
            return nameA.localeCompare(nameB);
          });

          this.documentListChangedEvent.next(this.documents.slice());
        },
        (error: any) => {
          console.error('Error fetching documents;', error);  // Log errors
        }
      );
  }

  getDocument(id: string) {
    return this.documents.find(document => document.id === id) || null;
  }

  storeDocuments() {
    // Converts the documents array to a JSON string for transmission
    const documentsCopy = JSON.stringify(this.documents);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Make the HTTP PUT request to update the documents in Firebase
    this.http
      .put(
        'https://cms-cont-mess-doc-default-rtdb.firebaseio.com/documents.json',
        documentsCopy, { headers: headers }
      )
      .subscribe(
        (response) => {
          console.log('Documents successfully updated:', response);
        },
        (error) => {
          console.error('Error updating documents:', error);
        }
      );

    // Emit the cloned documents to notify listeners of the changes
    this.documentListChangedEvent.next(this.documents.slice());
  }

  // Validates the document, deletes if exists, and calls storeDocuments
  deleteDocument(document: Document) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    const documentsListClone = this.documents.slice();
    // Calling storeDocuments to persist changes
    this.storeDocuments();
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
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId.toString();
    console.log('Adding Document:', newDocument);
    this.documents.push(newDocument);
    // Call storeDocuments to save the updated list
   // const documentsListClone = this.documents.slice();
    this.storeDocuments();
  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;
    console.log('Updating Document:', newDocument);
    this.documents[pos] = newDocument;
    // Call storeDocuments to save the updated list
    const documentsListClone = this.documents.slice();
    this.storeDocuments();
  }
}
