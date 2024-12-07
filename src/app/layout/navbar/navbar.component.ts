import {Component, HostListener, inject, OnInit} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ToolbarModule} from "primeng/toolbar";
import {MenuModule} from "primeng/menu";
import {CategoryComponent} from "./category/category.component";
import {AvatarComponent} from "./avatar/avatar.component";
import {DialogService} from "primeng/dynamicdialog";
import {MenuItem} from "primeng/api";
import {ToastService} from "../toast.service";
import {AnywhereComponent} from "./search-navbar/anywhere/anywhere.component";
import {NgIf} from "@angular/common";
import { DateComponent } from "./search-navbar/date/date.component";
import { GuestsComponent } from "./search-navbar/guests/guests.component";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    ButtonModule,
    FontAwesomeModule,
    ToolbarModule,
    MenuModule,
    CategoryComponent,
    AvatarComponent,
    AnywhereComponent,
    NgIf,
    DateComponent,
    GuestsComponent
],
  providers: [DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  location = "Địa điểm";
  checkindate="Nhận phòng";
  guests = "Khách";
  checkoutdate = "Trả phòng";

  toastService = inject(ToastService);

  //login () => this.authService.login();

  //logout () => this.authService.logout();

  currentMenuItems: MenuItem[] | undefined = [];
  showAnywhereModal: boolean = false;
  showDatePicker: boolean = false;
  showGuest:boolean =false;
  toggleAnywhereModal() {
    this.showAnywhereModal = !this.showAnywhereModal;
    this.showGuest=false;
    this.showDatePicker=false;
  }
  toggleDatePicker() {
    this.showDatePicker = !this.showDatePicker;
    this.showAnywhereModal=false;
    this.showGuest=false;
  }
  toggleGuest(){
    this.showGuest=!this.showGuest;
    this.showAnywhereModal=false;
    this.showDatePicker=false;
  }
  @HostListener('document:click',['$event'])
  onClickOutside(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.showAnywhereModal = false;
      this.showDatePicker=false;
      this.showGuest=false;
    }
  }
  onModalClick(event: Event) {
    event.stopPropagation();
  }

  ngOnInit() {
    this.fetchMenu();
    this.toastService.send({severity: "info", summary: "Welcome to the site!"});
  }

  private fetchMenu() {
    return [
      {
        label:  "Sign up",
        styleClass: "font-bold",
      },
      {
        label: "Log in",
      }
    ]
  }
}
