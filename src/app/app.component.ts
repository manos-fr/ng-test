import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router, private loadingService: LoadingService) {}
  isLoading$ = this.loadingService.loading$;

  ngOnInit() {
    this.router.navigate(['']);
  }
}
