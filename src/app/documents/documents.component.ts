import { Component, OnInit } from '@angular/core';
import { Document } from './document.model';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  selectedDocumentEvent: Document;

  constructor() {}

  ngOnInit() {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent = document;
  }


}
