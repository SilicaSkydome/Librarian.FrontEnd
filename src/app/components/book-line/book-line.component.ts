import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-book-line',
  templateUrl: './book-line.component.html',
  styleUrls: ['./book-line.component.css']
})
export class BookLineComponent implements OnInit{
  @Input() book!: IBook;
  author!: IUser;

  constructor(private userService: UserService){
  }

  ngOnInit(){
    this.userService.getUser(this.book.authorId).subscribe(author => {
      this.author = author;
    })
  }
}
