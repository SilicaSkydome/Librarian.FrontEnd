import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BooksService } from 'src/app/services/books.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { UserService } from 'src/app/services/user.service';
import { IChapter } from 'src/app/shared/interfaces/chapterInterfaces';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-chapter-line',
  templateUrl: './chapter-line.component.html',
  styleUrls: ['./chapter-line.component.css']
})
export class ChapterLineComponent implements OnInit{
  @Input() chapter!: IChapter;
  @Input() index!: number;

  user: IUser | undefined;
  author!: IUser;

  constructor(private auth: AuthService, private chapterService: ChapterService, private bookService: BooksService, private userService: UserService, private router: Router, private dialog: MatDialog){
  }

  ngOnInit() {
    if(localStorage.getItem('userData') !== null){
      this.user = JSON.parse(localStorage.getItem('userData')!);
    }

    this.bookService.getOne(this.chapter.bookId).subscribe(book => {
      this.userService.getUser(book.authorId).subscribe(author => {
        this.author = author;
      })
    });
  }

  confirmDelete(){
    let deleteRef = this.dialog.open(DeleteDialog, {
      width: 'auto',
      height: 'auto'
    })
    deleteRef.afterClosed().subscribe(result => {
      if(result){
        let token = this.auth.getToken();
        this.chapterService.deleteChapter(token!, this.chapter.id).subscribe( {
          next: () => {
            window.location.reload();
          },
          error: (error) => {
            console.warn(error);
          }
        })
      }
    })
  }
}

@Component({
  selector: 'delete-chapter-dialog',
  templateUrl: './delete-chapter-dialog.html',
  standalone: true,
  imports: [MatDialogModule, NgIf, MatButtonModule],
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>) {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
