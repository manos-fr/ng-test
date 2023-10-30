import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss'],
})
export class ArticleListComponent {
  @Input() title: string = '';
  @Input() articles: any[] = []; // Assuming 'articles' is an array of article objects
  @Input()
  searchControl!: FormControl;
  @Input() searchPlaceholder: string = '';
}
