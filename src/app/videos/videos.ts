import { Component,OnInit} from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-videos',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './videos.html',
  styleUrl: './videos.css',
})
export class Videos implements OnInit{
  private socket!: Socket;
  videos: any[] = [];
  rolUsuari: string | null = null;
  videoSelecionat: string = "";
  videoUrl: string | null = null;
  codigo: string | null = null;
  idVideo!: number;
  missatge: string = '';
  token: string | null = null;

  constructor(){}

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.rolUsuari = localStorage.getItem('rol');

    this.socket = io('http://localhost:3000', {
      transports: ['websocket'],
      auth: {token: this.token }
    });

    this.socket.on('connect', () => {
      this.socket.emit('registerPlatform', 'PC');
      this.socket.emit('llistaVideos');
    });

    this.socket.on('videos', (data: any[]) => {
      this.videos = data.filter(video => {
        if (video.rol === "premium_user" && this.rolUsuari !== "premium_user" && this.rolUsuari !== "admin") {
          return false;
        }
        return true
      });
    });

    this.socket.on('videoAsignado', (data: any) => {
      this.videoUrl = null;
      this.codigo = data.codigo;
      this.idVideo = data.id;
      this.missatge = 'Codi assignat: ' + data.codigo;
    });

    this.socket.on('permisoVideo', (data: any) => {
      if (data.id === this.idVideo) {
        this.videoUrl = `http://localhost:3000/videos/${data.nombre_archivo}?token=${this.token}`;
        this.missatge = 'Permís concedit';
      }
    });
  }

  demanarVideo() {
    if (!this.videoSelecionat) return;
    this.socket.emit('pedirVideo', { nombre_archivo: this.videoSelecionat });
  }

}
