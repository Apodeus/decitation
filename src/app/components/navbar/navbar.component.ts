import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import dayjs from "dayjs";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  imgUrl : string = '/assets/decitation-6x.png';
  imgAlt :string = 'Decitation Img';


  protected readonly dayjs = dayjs;
}
