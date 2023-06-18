import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';
import { BooksService } from 'src/app/services/books.service';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit {
  user: IUser | undefined;
  writing: IBook[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private booksService: BooksService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.userService.getUser(params['id']).subscribe((user) => {
        this.user = user;
      });
      this.booksService.getBooksByAuthor(params['id']).subscribe((books) => {
        this.writing = books;
      });
    });
  }
}
