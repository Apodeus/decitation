import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.css'
})
export class VictoryComponent {
  @Input() citation: string = '';
  @Input() author: string = '';

}
