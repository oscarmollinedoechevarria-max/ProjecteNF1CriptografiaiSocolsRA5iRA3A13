import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ProjecteNF1CriptografiaiSocolsRA5iRA3A13');
}
