import { Component,Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document('1', 'Name1', 'This is the first document', 'Joe'),
    new Document('2', 'Name2', 'This is the second document', 'Sage'),
    new Document('3', 'Name3', 'This is the third document', 'Tate'),
    new Document('4', 'Name4', 'This is the fourth document', 'Ephraim'),
    new Document('5', 'Name5', 'This is the fifth document', 'Liam')
  ];

  constructor() {}

  //Lifecyle hook
  ngOnInit() {

  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
