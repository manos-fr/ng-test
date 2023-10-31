import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { Subscription } from 'rxjs';
import { Article } from '../types/Article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  articles: Article[] = [];
  searchControl: FormControl = new FormControl();
  articlesSubscription!: Subscription;
  searchControlSubscription!: Subscription;

  constructor(
    private articleService: ArticleService,
    private loadingService: LoadingService
  ) {
    this.loadingService.setLoadingState(true);
  }

  ngOnInit() {
    this.articlesSubscription = this.articleService
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

    this.searchControlSubscription = this.searchControl.valueChanges
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

  ngOnDestroy(): void {
    this.articlesSubscription?.unsubscribe();
    this.searchControlSubscription?.unsubscribe();
  }
}
