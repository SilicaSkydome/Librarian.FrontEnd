import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { IBookAdd } from 'src/app/shared/interfaces/bookInterfaces';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-add-book-page',
  templateUrl: './add-book-page.component.html',
  styleUrls: ['./add-book-page.component.css'],
})
export class AddBookPageComponent implements OnInit {
  form!: FormGroup;
  user: IUser = JSON.parse(localStorage.getItem('userData')!);
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

  constructor(
    private auth: AuthService,
    private bookService: BooksService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      coverUrl: new FormControl(),
      tags: new FormControl(),
      description: new FormControl(),
    });
  }
  onSubmit() {
    this.form.disable();

    const bookData: IBookAdd = {
      name: this.form.value.name,
      coverUrl: this.form.value.coverUrl,
      authorId: this.user.id,
      tags: this.form.value.tags,
      description: this.form.value.description,
      date: new Date().toISOString(),
    };

    let token = this.auth.getToken();

    this.bookService.addBook(token!, bookData).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.warn(error);
        this.form.enable();
      },
    });
  }
}
