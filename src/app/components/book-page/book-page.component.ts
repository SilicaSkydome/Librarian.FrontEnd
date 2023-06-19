import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IBook } from 'src/app/shared/interfaces/bookInterfaces';
import { BooksService } from 'src/app/services/books.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';
import {
  IChapter,
  IChapterAdd,
} from 'src/app/shared/interfaces/chapterInterfaces';
import { ChapterService } from 'src/app/services/chapter.service';
import { AuthService } from 'src/app/services/auth.service';
import { LibraryService } from 'src/app/services/library.service';
import { IReview, IReviewAdd } from 'src/app/shared/interfaces/reviewInterface';
import { ReviewService } from 'src/app/services/review.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {
  book!: IBook;
  user: IUser | undefined;
  author!: IUser;
  tab: string = 'comments';
  reviews: IReview[] | undefined;
  chapters: IChapter[] = [];
  form!: FormGroup;

  reviewsForm!: FormGroup;
  reviwsCount: number = 0;
  pageIndex: number = 0;
  page: number = 1;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private bookService: BooksService,
    private chapterService: ChapterService,
    private reviewService: ReviewService,
    private library: LibraryService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    });
    this.reviewsForm = new FormGroup({
      reviewText: new FormControl(null, [Validators.required]),
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (localStorage.getItem('userData') !== null) {
      this.user = JSON.parse(localStorage.getItem('userData')!);
    }

    this.bookService.getOne(id).subscribe((book) => {
      this.book = book;

      this.userService.getUser(book.authorId).subscribe((author) => {
        this.author = author;
      });

      this.chapterService.getChapters(book.id).subscribe((chapters) => {
        this.chapters = chapters;
      });

      this.reviewService.getReviews(1, book.id).subscribe((reviews) => {
        this.reviews = reviews;
      });

      this.reviewService.getReviewsCount(book.id).subscribe((count) => {
        this.reviwsCount = count;
      });
    });
  }

  libraryControl(value: string) {
    let token = this.auth.getToken();
    let libraryStats = {
      bookId: this.book.id,
      readerId: this.user!.id,
      status: value,
    };
    console.log(libraryStats);
    this.library.addToLibrary(token, libraryStats).subscribe({
      next: () => {},
      error: (error) => {
        console.warn(error);
        this.form.enable();
      },
    });
  }

  confirmDelete() {
    let deleteRef = this.dialog.open(DeleteDialog, {
      width: 'auto',
      height: 'auto',
    });
    deleteRef.afterClosed().subscribe((result) => {
      if (result) {
        let token = this.auth.getToken();
        this.bookService.deleteBook(token!, this.book.id).subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) => {
            console.warn(error);
          },
        });
      }
    });
  }

  changeTab(tab: string) {
    this.tab = tab;
  }
  addReview() {
    let token = this.auth.getToken();

    if (token) {
      const reviewData: IReviewAdd = {
        authorId: this.user!.id,
        bookId: this.book.id,
        text: this.reviewsForm.value.reviewText,
      };
      this.reviewService.addReview(token, reviewData).subscribe({
        next: () => {
          window.location.reload();
        },
        error: (error) => {
          console.warn(error);
          this.form.enable();
        },
      });
    } else {
      this.router.navigate(['/register']);
    }
  }
  pageEvent(e: PageEvent) {
    this.pageIndex = e.pageIndex + 1;

    this.reviewService
      .getReviews(e.pageIndex + 1, this.book.id)
      .subscribe((reviews) => {
        this.reviews = reviews;
      });
  }
  onSubmit() {
    const chapterData: IChapterAdd = {
      bookId: this.book.id,
      name: this.form.value.name,
      text: this.form.value.text.replace(/\n/g, '<br>'),
    };

    let token = this.auth.getToken();

    this.chapterService.addChapter(token!, chapterData).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.warn(error);
        this.form.enable();
      },
    });
  }
}

@Component({
  selector: 'delete-dialog',
  templateUrl: './delete-dialog.html',
  standalone: true,
  imports: [MatDialogModule, NgIf, MatButtonModule],
})
export class DeleteDialog {
  constructor(public dialogRef: MatDialogRef<DeleteDialog>) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
}
