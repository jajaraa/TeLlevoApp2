import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AnimationController } from '@ionic/angular';
import { AuthenticatorService } from '../servicios/authenticator.service';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  login = {
    email: '',
    password: '',
  };
  
  user = {} as any;
  mensaje = '';

  spinner = false;

  ngOnInit() {
    this.animarLogo();
    this.animarAuto();
  }
  constructor(private apiService: ApiService, private authenticatorService: AuthenticatorService, private router: Router, private animationController: AnimationController) {


  }
  animarLogo() {
    const logo = document.querySelector('.login img') as HTMLElement;
  
    const animacion = this.animationController.create()
      .addElement(logo)
      .duration(4000)
      .iterations(Infinity)
      .keyframes([
        { offset: 0, transform: 'rotate(0deg)' },
        { offset: 0.25, transform: 'rotate(-5deg)' },
        { offset: 0.5, transform: 'rotate(0deg)' },
        { offset: 0.75, transform: 'rotate(5deg)' }, 
        { offset: 1, transform: 'rotate(0deg)' } 
      ]);
  
    animacion.play();
  }

  animarAuto() {
    const auto = document.querySelector('.auto') as HTMLElement;
    
    const animacion = this.animationController.create()
      .addElement(auto)
      .duration(5000)  
      .iterations(Infinity) 
      .keyframes([
        { offset: 0, transform: 'translateX(-200%)' }, 
        { offset: 1, transform: 'translateX(100%)' }  
      ]);
    
    animacion.play();
  }
 

  cambiarSpinner() {
    this.spinner = !this.spinner;
  }
  async validar() {
    if (
      await this.authenticatorService.loginUser(
        this.login.email,
        this.login.password
      )
    ) {
      this.mensaje = 'Conexion exitosa';

      this.apiService.getUser(this.login.email).subscribe((response) => {
        this.user = response;

        let navigationExtras: NavigationExtras = {
          state: {
            user: this.user,
          },
        };

        this.cambiarSpinner();

        setTimeout(() => {
          this.router.navigate(['/perfil'], navigationExtras);
          this.cambiarSpinner();
          this.mensaje = '';
        }, 3000);
      });
    } else {
      this.mensaje = 'Usuario o contraseña incorrectos';
    }
  }
}
