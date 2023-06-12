import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit{
  form!: FormGroup;
  books: IBook[] | null = [];
  tagList: string[] = ['Фентези','Проза','Мистика','Фантастика','Приключения','Юмор','Поэзия','Ужасы','Триллер','ЛитРПГ','РеалРПГ','Разное','Боевик','Детектив','Роман']

  constructor(private bookService: BooksService){}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(),
      tags: new FormControl()
    });

    this.onSubmit();
  }

  onSubmit(){
    this.bookService.getAll(null).subscribe(books => {
      this.books = books;
    })
  }
}
