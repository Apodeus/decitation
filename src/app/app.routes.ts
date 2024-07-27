import {Routes} from '@angular/router';
import {DecitationComponent} from "./components/decitation/decitation.component";
import {ArchiveComponent} from "./components/archive/archive.component";
import {AboutComponent} from "./components/about/about.component";

export const routes: Routes = [
  {
    path: 'game/:date',
    title: 'Home',
    pathMatch: "full",
    component: DecitationComponent
  },
  {
    path: 'archives',
    pathMatch: "full",
    title: 'Archives',
    component: ArchiveComponent
  },
  {
    path: 'about',
    title: 'About',
    component: AboutComponent
  }
];
