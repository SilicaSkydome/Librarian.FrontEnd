import { BooksService } from 'src/app/services/books.service';
import { IBook } from './../../shared/interfaces/bookInterfaces';
import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-user-library',
  templateUrl: './user-library.component.html',
  styleUrls: ['./user-library.component.css']
})
export class UserLibraryComponent implements OnInit{
  library: IBook[] | undefined
  constructor(private bookService: BooksService){
  }

  public getBooks(status: string | null){
    console.log('test');
    let user: IUser = JSON.parse(localStorage.getItem('userData')!);
    this.bookService.getUserLibrary(user.id, status).subscribe(books => {
      this.library = books;
    });
  }

  ngOnInit(): void {
      this.getBooks("reading");
  }
}
