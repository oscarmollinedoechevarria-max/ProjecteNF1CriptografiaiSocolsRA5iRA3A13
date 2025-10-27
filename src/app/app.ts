import {Component, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { io, Socket } from 'socket.io-client';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ProjecteNF1CriptografiaiSocolsRA5iRA3A13')
  private socket!: Socket;
  videos: string[] = [];
  missatge: string = '';

  constructor() { }

  ngOnInit(): void {

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
    });

    this.socket.on('connectionPC', (data: string[]) => {
      console.log('Datos recibidos:', data)
      this.videos = data
    });
  }
}
