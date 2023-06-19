import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewService } from 'src/app/services/review.service';
import { UserService } from 'src/app/services/user.service';
import { IReview } from 'src/app/shared/interfaces/reviewInterface';
import { IUser } from 'src/app/shared/interfaces/userInterfaces';

@Component({
  selector: 'app-review-line',
  templateUrl: './review-line.component.html',
  styleUrls: ['./review-line.component.css'],
})
export class ReviewLineComponent implements OnInit {
  @Input() review!: IReview;
  author: IUser | undefined;
  user: IUser | undefined;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private auth: AuthService,
    private reviewService: ReviewService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userService.getUser(this.review.authorId).subscribe((user) => {
      this.author = user;
    });

    if (localStorage.getItem('userData') !== null) {
      this.user = JSON.parse(localStorage.getItem('userData')!);
    }
  }

  confirmDelete() {
    let deleteRef = this.dialog.open(DeleteDialog, {
      width: 'auto',
      height: 'auto',
    });
    deleteRef.afterClosed().subscribe((result) => {
      if (result) {
        let token = this.auth.getToken();
        this.reviewService.deleteReview(token!, this.review.id).subscribe({
          next: () => {
            window.location.reload();
          },
          error: (error) => {
            console.warn(error);
          },
        });
      }
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
