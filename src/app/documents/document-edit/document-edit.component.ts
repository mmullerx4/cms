import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Document } from '../document.model';
import { DocumentService } from '../document.service';


@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document | null = null;
  //document: Document;
  document: Document = { id: '', name: '', description: '', url: '', children: []};
  editMode: boolean = false;

  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params['id'];

      if (!id) {
        this.editMode = false;
        return;
      }

     //Get the original document and clone
     this.originalDocument = this.documentService.getDocument(id);
     if (!this.originalDocument) {
      return;
     }

     this.editMode = true;
     this.document = JSON.parse(JSON.stringify(this.originalDocument));
    });
  }

  onSubmit(form: NgForm) {
   const value = form.value;
   console.log('Form values:', value);

   const newDocument = new Document(
    value.id || '',
    value.name || '',
    value.description || '',
    value.url || '',
    value.children || []
   );

   if (this.editMode) {
    this.documentService.updateDocument(this.originalDocument, newDocument);
   } else {
    //add new document
    this.documentService.addDocument(newDocument);
   }

   this.router.navigate(['/documents']);
  }

  onCancel() {
    console.log('Cancel button clicked');
    this.router.navigate(['/documents']);
  }


}
