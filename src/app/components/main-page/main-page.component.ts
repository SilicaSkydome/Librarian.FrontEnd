import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from 'src/app/modules/book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  books: IBook[] | undefined;

  constructor(private bookService: BooksService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.bookService.getAll().subscribe(books => {
      this.books = books;
      console.log(this.books);
    })
  }
}
