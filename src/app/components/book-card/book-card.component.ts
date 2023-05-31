import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit{
  @Input() book!: IBook;
  author: IUser | undefined;
  constructor(private userService: UserService){
  }

  ngOnInit(): void {
    this.userService.getUser(this.book.authorId).subscribe(author => {
      this.author = author;
    })

  }

}
