import { Component, HostListener } from '@angular/core';
import 'bootstrap';
import { ScrollDispatcher } from '@angular/cdk/scrolling';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Bomberos Oña';
  elementosAnimados!: NodeListOf<Element>;
  animationTimeout: any;
  constructor(private scrollDispatcher: ScrollDispatcher){

  }

  ngAfterViewInit() {
    this.elementosAnimados = document.querySelectorAll('.info-unidad');
    console.log("perra hola:"+this.elementosAnimados)
    console.log('Elementos encontrados:', this.elementosAnimados.length);
    this.checkElementsVisibility();
    console.log("hola perra aqui estoy"+this.checkElementsVisibility())
  }
  noticias=true;
  carrusel=true;

  @HostListener('window:scroll', ['$event'])
  onScroll(event: Event) {
    if(this.animationTimeout){
      clearTimeout(this.animationTimeout);
    }
    this.animationTimeout=setTimeout(()=>{
      this.checkElementsVisibility();
    },100);
  }

  checkElementsVisibility() {
    this.elementosAnimados.forEach((elemento: Element) => {
      if (this.isElementInViewport(elemento as HTMLElement)) {
        elemento.classList.add('animacion1');
      } else {
        elemento.classList.remove('animacion1');
      }
    });
  }

  private isElementInViewport(element: HTMLElement): boolean {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  ocultar(){
    this.carrusel=false;
  }
  aparecer(){
    this.carrusel=true;
  }
}
