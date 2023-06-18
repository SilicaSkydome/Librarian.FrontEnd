import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css'],
})
export class BookSearchComponent implements OnInit {
  form!: FormGroup;
  books: IBook[] = [];
  tagList: string[] = [
    'Фентези',
    'Проза',
    'Мистика',
    'Фантастика',
    'Приключения',
    'Юмор',
    'Поэзия',
    'Ужасы',
    'Триллер',
    'ЛитРПГ',
    'РеалРПГ',
    'Разное',
    'Боевик',
    'Детектив',
    'Роман',
  ];

  length: number = 0;
  pageIndex: number = 0;

  page: number = 1;
  name: string = '';
  tags: string[] = [];

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(),
      tags: new FormControl(),
    });

    this.route.queryParams.subscribe(({ name, tags }) => {
      if (name) {
        this.name = name;
        this.form.controls['name'].setValue(name);
      }
      if (tags) {
        this.tags.push(tags);
        this.form.controls['tags'].setValue([tags]);
      }
    });

    this.bookService.searchCount(this.name, this.tags).subscribe((length) => {
      this.length = length;
    });

    this.search();
  }

  onSubmit() {
    this.name = this.form.value.name;
    this.tags = this.form.value.tags;

    console.log(this.tags);
    this.search();
  }
  pageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex + 1;
    this.search();
  }
  search() {
    this.bookService
      .search(this.page, this.name, this.tags)
      .subscribe((books) => {
        this.books = books;
      });
  }
}
