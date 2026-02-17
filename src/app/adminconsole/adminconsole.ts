import {Component, OnDestroy, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminconsole',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './adminconsole.html',
  styleUrl: './adminconsole.css',
  standalone: true
})
export class Adminconsole implements OnInit {
  stats: any = {};
  files: any[] = [];
  fileSeleccionat: any = null;

  private intervalStats: any;
  private intervalFiles: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.fetchStats();
    this.fetchFiles();

    this.intervalStats = setInterval(() => this.fetchStats(), 5000);
    this.intervalFiles = setInterval(() => this.fetchFiles(), 30000);
  }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  fetchStats() {
    this.http.get<any>('http://localhost:3000/admin/stats', this.getHeaders())
      .subscribe(data => this.stats = data);
  }

  fetchFiles() {
    this.http.get<any[]>('http://localhost:3000/admin/ftp/files', this.getHeaders())
      .subscribe(data => this.files = data);
  }

  seleccionarFitxer(f: any) {
    this.fileSeleccionat = this.fileSeleccionat?.name === f.name ? null : f;
  }
}
