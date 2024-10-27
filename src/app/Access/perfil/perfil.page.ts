import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  user = {} as any;
  users: any[] = [];

  constructor(private router: Router, private apiService: ApiService) {
    const navegacion = this.router.getCurrentNavigation();
    const state = navegacion?.extras.state as {
      user: any;
    };

    this.user = state.user;
  }

  ngOnInit() {
    this.apiService.getUsers().subscribe((data: any) => {
      this.users = data;
    });
  }
}