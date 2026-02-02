import { Routes } from '@angular/router';
import { Videos } from './videos/videos';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', component: Login },
  { path: 'videos', component: Videos }
];
