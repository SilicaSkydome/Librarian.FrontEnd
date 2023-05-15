import { Component, Input } from '@angular/core';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book!: IBook;
}
