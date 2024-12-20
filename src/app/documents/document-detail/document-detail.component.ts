import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Document } from  '../document.model';
import { DocumentService } from '../document.service';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {
  document: Document;
  id: string;
  nativeWindow: any;

  constructor(
    private documentService: DocumentService,
    private windRefService: WindRefService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    //get the native window object
    this.nativeWindow = this.windRefService.getNativeWindow();

    //get the document id from the route parameters
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['id'];
        this.document = this.documentService.getDocument(this.id);
    });
  }

  onView() {
    if (this.document.url) {
      this.nativeWindow.open(this.document.url, '_blank');
    }
  }

  onDelete() {
    this.documentService.deleteDocument(this.document);
    this.router.navigate(['/documents']);
  }


}
