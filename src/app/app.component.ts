import {Component} from '@angular/core';
import {ShoppingListService} from "./shopping-list/shopping-list.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers:[ShoppingListService]
})
export class AppComponent {

  currentPage: number=1;

  onPageChangeFired($event: number) {
    this.currentPage=$event;
  }
}
