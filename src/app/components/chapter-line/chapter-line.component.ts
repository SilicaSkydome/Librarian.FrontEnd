import { Component, Input } from '@angular/core';
import { IChapter } from 'src/app/shared/interfaces/chapterInterfaces';

@Component({
  selector: 'app-chapter-line',
  templateUrl: './chapter-line.component.html',
  styleUrls: ['./chapter-line.component.css']
})
export class ChapterLineComponent {
  @Input() chapter!: IChapter;
  @Input() index!: number;

}
