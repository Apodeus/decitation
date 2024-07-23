import {Component, input, Input} from '@angular/core';
import { Citation } from '../../models/citation.model';

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.css'
})
export class VictoryComponent {
  citation = input.required<Citation>();
}
