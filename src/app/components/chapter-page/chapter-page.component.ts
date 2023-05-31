import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterService } from 'src/app/services/chapter.service';
import { IChapter } from 'src/app/shared/interfaces/chapterInterfaces';

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.css']
})
export class ChapterPageComponent implements OnInit{
  chapter!: IChapter

  constructor(private chapterService: ChapterService, private actRoute: ActivatedRoute){    
  }

  ngOnInit(){
    const id = this.actRoute.snapshot.paramMap.get('id');
    this.chapterService.getChapter(id!).subscribe(chapter => {
      this.chapter = chapter;
    })
  }
}
