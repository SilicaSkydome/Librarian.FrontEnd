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
  library: IBook[] | undefined;
  type: string = "Все";
  constructor(private bookService: BooksService){
  }

  public getBooks(status: string | null){
    let user: IUser = JSON.parse(localStorage.getItem('userData')!);
    this.bookService.getUserLibrary(user.id, status).subscribe(books => {
      this.library = books;
    });

    if(status == null){
      this.type = "Все";
    } else if(status == "reading"){
      this.type = "Читаю";
    } else if(status == "readLater"){
      this.type = "Прочту позже";
    } else if(status == "Dropped"){
      this.type = "Не интересно";
    }

  }

  ngOnInit(): void {
      this.getBooks("reading");
  }
}
