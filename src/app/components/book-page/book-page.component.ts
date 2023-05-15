import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book: IBook | undefined;

  constructor(private bookService: BooksService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.bookService.getOne(id).subscribe(book => {
      this.book = book;
      console.log(this.book);
    })
  }


}
