import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterService } from 'src/app/services/chapter.service';
import { IChapter } from 'src/app/shared/interfaces/chapterInterfaces';

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.css'],
})
export class ChapterPageComponent implements OnInit {
  chapter!: IChapter;
  chapters!: IChapter[];

  constructor(
    private chapterService: ChapterService,
    private router: Router,
    private actRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    this.actRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.chapterService.getChapter(id!).subscribe((chapter) => {
        this.chapter = chapter;
        // prettier-ignore
        this.chapterService.getChapters(chapter.bookId).subscribe((chapters) => {
          this.chapters = chapters;
        });
      });
    });
  }
  getPrevChap() {
    let index = this.chapters.findIndex((obj) => obj.id === this.chapter.id);
    console.log(index);
    if (index == 0) {
      this.router.navigate([`/books/id/${this.chapter.bookId}`]);
    } else {
      this.router
        .navigate([`./chapter/${this.chapters[index - 1].id}`])
        .then(() => {
          this.scrollToTop();
        });
    }
  }
  getNextChap() {
    let index = this.chapters.findIndex((obj) => obj.id === this.chapter.id);
    console.log(index);
    if (index == this.chapters.length - 1) {
      this.router.navigate([`/books/id/${this.chapter.bookId}`]);
    } else {
      this.router
        .navigate([`./chapter/${this.chapters[index + 1].id}`])
        .then(() => {
          this.scrollToTop();
        });
    }
  }
  private scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    });
  }
}
