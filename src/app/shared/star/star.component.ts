import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'pm-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.css']
})
export class StarComponent implements OnChanges {
  // Declare a data-bound property, it will be updated automatically in case of changes
  @Input() rating: number;
  // The only way the inner component talks to its container is by emitting an event
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter();

  starWidth: number;

  ngOnChanges(): void {
    this.starWidth = this.rating * 86 / 5;
  }

  onClick(): void {
    // Instead of string, we can use a custom typed object for more complex data payload
    this.ratingClicked.emit(`The rating is: ${this.rating}`);
  }
}
