import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login implements OnInit{

  usuari: string = '';
  contrasenya: string = '';
  loginError: string = '';
  token: string | null = null;

  constructor(private http: HttpClient,private router: Router) {}
  ngOnInit(): void {
  }

  login() {
    this.http.post<any>('http://localhost:3000/login', {
      usuari: this.usuari,
      contrasenya: this.contrasenya
    }).subscribe({
      next: (res) => {
        this.token = res.token;
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol);
        this.loginError = '';
        if(res.rol == 'admin'){
          this.router.navigate(['/admin']);
        }
        else {
          this.router.navigate(['/videos']);
        }
      },
      error: (err) => {
        this.loginError = err.error?.error || 'Error de login';
      }
    });
  }

}
