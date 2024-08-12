import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent{
  isManageExpanded: boolean = false;

  getisManageExpanded(){
    return (this.isManageExpanded)?'true':'false'
  }
  currentPage:number = 1;
  @Output()
  changePageEmitter = new EventEmitter<number>();

  currentPageChange(number: number) {
    this.currentPage = number;
    this.changePageEmitter.emit(this.currentPage);
  }
}

