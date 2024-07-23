import {Component, computed, inject, input, signal} from '@angular/core';
import {MatIconModule} from "@angular/material/icon";
import {CommonModule, registerLocaleData} from "@angular/common";
import localeFr from '@angular/common/locales/fr';
import {ActivatedRoute, Router } from '@angular/router';
import dayjs from "dayjs";
import {DecitationGateway} from "../../ports/decitation.gateway";
import {injectParams} from "ngxtension/inject-params";

registerLocaleData(localeFr);

@Component({
  selector: 'app-day-selector',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './day-selector.component.html',
  styleUrl: './day-selector.component.css'
})
export class DaySelectorComponent {

  router= inject(Router);
  activatedRoute = inject(ActivatedRoute);
  service = inject(DecitationGateway);

  actDate = injectParams('date');
  currDate = computed(() => {
    return dayjs(this.actDate()).startOf('day').toDate();
  });
  currCitation = computed(() => {
      return this.service.getCitationByDate(this.currDate());
  })

  constructor() {
  }

  onNextClick() {
    this.router.navigate([`/`, dayjs(this.activatedRoute.snapshot.params['date']).add(1, 'day').format('YYYY-MM-DD')]);
  }

  onPreviousClick() {
    this.router.navigate([`/`, dayjs(this.activatedRoute.snapshot.params['date']).subtract(1, 'day').format('YYYY-MM-DD')]);
  }

  protected readonly localeFr = localeFr;
  protected readonly dayjs = dayjs;
}
