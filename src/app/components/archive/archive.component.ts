import {Component, inject} from '@angular/core';
import {DecitationGateway} from '../../ports/decitation.gateway';
import dayjs from "dayjs";
import {DatePipe} from "@angular/common";
import {Router} from "@angular/router";
import {SaveStoreService} from '../../adapters/save-store.service';

interface ArchiveItem {
  numero: number,
  date: Date,
  isCompleted: boolean
}

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.css'
})
export class ArchiveComponent {

  service = inject(DecitationGateway);
  router= inject(Router);
  saveStore= inject(SaveStoreService);
  citations = new Array<ArchiveItem>();

  constructor() {
    this.init();
  }

  navigateTo(item : ArchiveItem) {
    this.router.navigate([`/game/`, dayjs(item.date).format('YYYY-MM-DD')])
  }

  private init() {
    let lastIdx = this.service.getCitationByDate(new Date(Date.now()))[0];
    let currDate = new Date(Date.now());
    for(let i = lastIdx; i >= 0; i--) {
      this.citations.push(
        {
          numero: i,
          date: dayjs(currDate).subtract((lastIdx) - i, 'day').toDate(),
          isCompleted: this.saveStore.has(i)
        });
      console.log('idx : ', this.citations);
    }
  }

}
