import {Component, effect, EventEmitter, inject, input, Output, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CategoryService} from "../../layout/navbar/category/category.service";
import {CurrencyPipe, DatePipe, NgFor, NgIf} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import { RoomItem } from './room-item.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room-item',
  standalone: true,
  imports: [NgFor, DatePipe, CurrencyPipe, NgIf],
  templateUrl: './room-item.component.html',
  styleUrl: './room-item.component.scss'
})
export class RoomItemComponent {
    items: RoomItem[] = [
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Cozy Studio',
            location: 'New York',
            price: 75,
            description: 'A cozy studio with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Luxury Suite',
            location: 'Paris',
            price: 150,
            description: 'A luxurious suite with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        },
        {
            title: 'Family Room',
            location: 'London',
            price: 100,
            description: 'A family room with a view of the city',
            image: 'https://a0.muscache.com/im/pictures/miso/Hosting-53519419/original/ad0a54d5-65ac-4cc3-b202-07cc99d2f081.jpeg?im_w=720',
            date: new Date()
        }
    ]

    displayItems: RoomItem[] = [];

    itemsPerLoad = 20;

    ngOnInit() {
        this.loadMoreItems();
    }

    loadMoreItems() {
        const currentLength = this.displayItems.length;
        const newItems = this.items.slice(currentLength, currentLength + this.itemsPerLoad);
        this.displayItems.push(...newItems);
    }
}