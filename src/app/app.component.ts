import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading$: Observable<boolean> | undefined;
  constructor(private router: Router, private loadingService: LoadingService) {}

  ngOnInit() {
    this.isLoading$ = this.loadingService.loading$;
    this.router.navigate(['']);
  }
}
