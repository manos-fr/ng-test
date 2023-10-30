import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
} from 'rxjs/operators';
import { ArticleService } from '../services/article.service';
import { LoadingService } from '../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  articles: any[] = [];
  searchControl: FormControl = new FormControl();

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    this.loadingService.setLoadingState(true);
    this.articleService
      .getArticles()
      .pipe(
        catchError((err) => {
          throw new Error(err);
        })
      )
      .subscribe((articles) => {
        this.articles = articles;
        this.loadingService.setLoadingState(false);
      });

    this.searchControl.valueChanges
      .pipe(
        tap(() => this.loadingService.setLoadingState(true)),
        debounceTime(750),
        distinctUntilChanged(),
        switchMap((keyword: string) =>
          this.articleService.searchArticles(keyword)
        )
      )
      .subscribe((searchResults) => {
        this.articles = searchResults;
        this.loadingService.setLoadingState(false);
      });
  }
}
