import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  documents: Document[] = [];

  constructor(private documentService: DocumentService) {}

  //Lifecyle hook
  ngOnInit() {
    //subscribe to the documentChangedEvent
    this.subscription = this.documentService.documentListChangedEvent.subscribe(
      (documentsList: Document[]) => {
        this.documents = documentsList;
      }
    )
    //fetch docs on initialization
    this.documents = this.documentService.getDocuments();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
