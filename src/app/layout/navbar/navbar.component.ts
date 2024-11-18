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
import {AnywhereComponent} from "./anywhere/anywhere.component";
import {NgIf} from "@angular/common";

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
  ],
  providers: [DialogService],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  location = "Anywhere";
  guests = "Add guests";
  dates = "Any week";

  toastService = inject(ToastService);

  //login () => this.authService.login();

  //logout () => this.authService.logout();

  currentMenuItems: MenuItem[] | undefined = [];
  showAnywhereModal: boolean = false;

  toggleAnywhereModal() {
    this.showAnywhereModal = !this.showAnywhereModal;
  }

  onClickOutside(event: Event) {
    if ((event.target as HTMLElement).classList.contains('modal')) {
      this.showAnywhereModal = false;
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
