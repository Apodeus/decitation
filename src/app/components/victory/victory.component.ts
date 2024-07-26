import {Component, input} from '@angular/core';
import {Citation} from '../../models/citation.model';
import {Chrono} from "../chrono/chrono.component";
import {AsyncPipe, DecimalPipe, formatNumber, JsonPipe, KeyValuePipe} from "@angular/common";

@Component({
  selector: 'app-victory',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    KeyValuePipe,
    DecimalPipe
  ],
  templateUrl: './victory.component.html',
  styleUrl: './victory.component.css'
})
export class VictoryComponent {
  citation = input.required<[number, Citation]>();
  time = input.required<Chrono>();

  copyToClipboard() {
    navigator.clipboard.writeText(`Decitation #${this.citation()[0]}\nDéchiffré en ${this.formatTime(this.time())}`);
  }

  private formatTime(time: Chrono): string {
    return `${formatNumber(time.heure, 'fr-FR', '2.')}:${formatNumber(time.minute, 'fr-FR','2.')}:${formatNumber(time.seconde,'fr-FR', '2.')}`;
  }

}
