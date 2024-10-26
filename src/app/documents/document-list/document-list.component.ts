import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {


  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  //Lifecyle hook
  ngOnInit() {
    //subscribe to the documentChangedEvent
    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      }
    )
    //fetch docs on initialization
    this.documents = this.documentService.getDocuments();
  }


}
