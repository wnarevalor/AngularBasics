import {
  Component,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated = false;
  @Output() featureSelected = new EventEmitter<string>();
  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService
  ) {}

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnInit() {
    this.userSub = this.authService.userBehaviorSubject.subscribe((user) => {
      this.isAuthenticated = !!user;
      // this.isAuthenticated = !user ? false : true; SAME!!!
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
