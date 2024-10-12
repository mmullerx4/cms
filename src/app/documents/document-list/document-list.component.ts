import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Name1', 'This is the first document', 'https://example.com/image1.png'),
    new Document('2', 'Name2', 'This is the second document', 'https://example.com/image2.png'),
    new Document('3', 'Name3', 'This is the third document', 'https://example.com/image3.png'),
    new Document('4', 'Name4', 'This is the fourth document', 'https://example.com/image4.png'),
    new Document('5', 'Name5', 'This is the fifth document', 'https://example.com/image5.png')
  ];

  constructor() {}

  //Lifecyle hook
  ngOnInit() {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
