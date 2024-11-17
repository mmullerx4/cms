import { Component, OnInit, Input } from '@angular/core';
import { Document } from '../document.model';


@Component({
  selector: 'cms-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})

export class DocumentItemComponent implements OnInit {
  @Input() document: Document; //so can receive from parent component - document


  constructor() {
    //this.document = undefined;
  }

  ngOnInit() {
    console.log('Document item received:', this.document);
  }

}
