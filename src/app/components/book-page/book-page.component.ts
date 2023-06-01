import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';
import { BooksService } from 'src/app/services/books.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';
import { IChapter, IChapterAdd } from 'src/app/shared/interfaces/chapterInterfaces';
import { ChapterService } from 'src/app/services/chapter.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  book!: IBook;
  user: IUser | undefined;
  author!: IUser;
  tab: string = "comments";
  chapters: IChapter[] = [];
  form!: FormGroup;

  constructor(private auth: AuthService, private userService: UserService, private bookService: BooksService, private chapterService: ChapterService, private route: ActivatedRoute, private router: Router, private dialog: MatDialog){
  }

  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required])
    });

    const id = this.route.snapshot.paramMap.get('id');

    if(localStorage.getItem('userData') !== null){
      this.user = JSON.parse(localStorage.getItem('userData')!);
    }

    this.bookService.getOne(id).subscribe(book => {
      this.book = book;

      this.userService.getUser(this.book.authorId).subscribe(author => {
        this.author = author;
      })

      this.chapterService.getChapters(this.book.id).subscribe(chapters => {
        this.chapters = chapters;
      })
    })
  }

  confirmDelete(){
    let deleteRef = this.dialog.open(DeleteDialog, {
      width: 'auto',
      height: 'auto'
    })
    deleteRef.afterClosed().subscribe(result => {
      if(result){
        let token = this.auth.getToken();
        this.bookService.deleteBook(token!, this.book.id).subscribe( {
          next: () => {
            this.router.navigate(['/'])
          },
          error: (error) => {
            console.warn(error);
          }
        })
      }
    })
  }

  changeTab(tab: string){
    this.tab = tab;
  }

  onSubmit(){
    const chapterData: IChapterAdd = {
      bookId: this.book.id,
      name: this.form.value.name,
      text: this.form.value.text
    };

    let token = this.auth.getToken();

    this.chapterService.addChapter(token!, chapterData).subscribe({
      next: () => {
        window.location.reload();

      },
      error: (error) => {
        console.warn(error);
        this.form.enable();
      }
    })
  }

}


@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.html',
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
