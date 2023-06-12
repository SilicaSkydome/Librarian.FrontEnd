import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit{
  popular: IBook[] | undefined;
  newBooks: IBook[] | undefined;
  updates: IBook[] | undefined;
  bestsellers: IBook[] | undefined;
  tagList: string[] = ['Фентези','Проза','Мистика','Фантастика','Приключения','Юмор','Поэзия','Ужасы','Триллер','ЛитРПГ','РеалРПГ','Разное','Боевик','Детектив','Роман']


  constructor(private bookService: BooksService, private route: ActivatedRoute){
  }

  ngOnInit(): void {
    this.bookService.getAll("popular").subscribe(books => {
      this.popular = books;
    })
    this.bookService.getAll("new").subscribe(books => {
      this.newBooks = books;
    })
    this.bookService.getAll("updates").subscribe(books => {
      this.updates = books;
    })
    this.bookService.getAll("bestsellers").subscribe(books => {
      this.bestsellers = books;
    })
  }
}
