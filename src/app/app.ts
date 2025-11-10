import { Component, OnInit, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('ProjecteNF1CriptografiaiSocolsRA5iRA3A13');
  private socket!: Socket;
  videos: string[] = [];
  videoSelecionat: string = "";
  videoUrl: string | null = null;
  codigo: string | null = null;
  idVideo!: number;
  missatge: string = '';



  ngOnInit(): void {
    this.socket = io('http://localhost:3000', { transports: ['websocket'] });

    this.socket.on('connect', () => {
      this.socket.emit('registerPlatform', 'PC');
      this.socket.emit('llistaVideos');
    });

    this.socket.on('videos', (data: string[]) => {
      this.videos = data;
    });

    // this.socket.on('videoAsignado', (data: any) => {
    //   this.videoUrl = null;
    //   this.codigo = data.codigo;
    //   this.idVideo = data.id;
    //   this.missatge = 'Codi assignat: ' + data.codigo + '. Introdueix-lo a A2 per obtenir permís.';
    // });
    //
    // this.socket.on('permisoVideo', (data: any) => {
    //   if (data.id === this.idVideo) {
    //     this.videoUrl = 'http://localhost:3000/videos/' + data.nombre_archivo;
    //     this.missatge = 'Permís concedit, pots reproduir el vídeo';
    //   }
    // });
  }

  demanarVideo() {
    this.socket.emit('pedirVideo');
  }
}
