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

  ngOnInit() {

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'] });


    this.socket.on('connect', () => {
      console.log('connectat:', this.socket.id);

      this.socket.emit('registerPlatform', 'PC');

      this.socket.emit('llistaVideos');
    });

    this.socket.on('videos', (data: string[]) => {
      console.log('videos:', data);
      this.videos = data;
    });
  }
}
