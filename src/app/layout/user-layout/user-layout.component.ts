import { Component, OnInit, inject } from '@angular/core';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { ToastService } from '../../layout/toast.service';
import { MessageService } from 'primeng/api';
import { fontAwesomeIcons } from '../../shared/font-awesome-icons';
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {FooterComponent} from "../footer/footer.component";
import {Button} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {RoomItemComponent} from "../../shared/room-item/room-item.component";

@Component({
  selector: 'app-user-layout',
  templateUrl: 'user-layout.component.html',
  styleUrls: ['user-layout.component.scss'],
  standalone: true,
  providers: [MessageService],
  imports: [RouterOutlet, Button, FontAwesomeModule, NavbarComponent, FooterComponent, ToastModule, RoomItemComponent]
})
export class UserLayoutComponent implements OnInit {
  faIconLibrary = inject(FaIconLibrary);
  isListingView = true;
  toastService = inject(ToastService);
  messageService = inject(MessageService);

  ngOnInit() {
    this.initFontAwesome();
    this.listenToastService();
  }

  private initFontAwesome() {
    this.faIconLibrary.addIcons(...fontAwesomeIcons);
  }

  private listenToastService() {
    this.toastService.sendSub.subscribe({
      next: newMessage => {
        if (newMessage && newMessage.summary !== this.toastService.INIT_STATE) {
          this.messageService.add(newMessage);
        }
      }
    });
  }
}
