import { Component } from '@angular/core';
import { NavController, ToastController, AnimationController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  username: string = '';

  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private animationController: AnimationController
  ) { }

  ngOnInit() {
    this.animarLogo();
    this.animarAuto();
  }

  async recuperarContrasena() {
    if (this.username.trim() === '') {
      const toast = await this.toastCtrl.create({
        message: 'Por favor, ingresa un nombre de usuario.',
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
      return;
    }

    console.log('Recuperando contraseña para:', this.username);

    const toast = await this.toastCtrl.create({
      message: 'Solicitud enviada. Revisa tu correo electrónico.',
      duration: 2000,
      position: 'bottom'
    });
    toast.present();

    setTimeout(() => {
      this.navCtrl.navigateRoot('/home');
    }, 2000);
  }

  animarLogo() {
    const logo = document.querySelector('.tellevo-logo') as HTMLElement;
  
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

  
}
