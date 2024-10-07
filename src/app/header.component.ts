import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() selectedFeatureEvent = new EventEmitter<string>(); //output to be able to listen to outside of component for the parent component (header.html)

  onSelected(selectedEvent: string) {
    this.selectedFeatureEvent.emit(selectedEvent);
  }
}
