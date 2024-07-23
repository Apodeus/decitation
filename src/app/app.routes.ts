import { Routes } from '@angular/router';
import {DecitationComponent} from "./components/decitation/decitation.component";
import {ArchiveComponent} from "./components/archive/archive.component";
import {AdminComponent} from "./components/admin/admin.component";

export const routes: Routes = [
  {
    path: ':date',
    title: 'Home',
    component: DecitationComponent
  },
  {
    path: 'archives',
    title: 'Archives',
    component: ArchiveComponent
  },
  {
    path: 'admin',
    title: 'Administration',
    component: AdminComponent
  }
];
