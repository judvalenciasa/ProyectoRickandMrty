import { Component } from '@angular/core';
import { PersonajesService } from './servicios/personajes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  personajes:any[];
  currentPage: number;
  numPages:number;

  constructor(private personajesService:PersonajesService){
    this.currentPage=1;

  }

  ngOnInit(){
    this.personajesService.getAll()
    .then(respuesta => {
      this.personajes = respuesta['results'];
      this.numPages = respuesta['info']['pages'];
    }).catch(error=>console.log(error));
  }

  async changePage(siguiente){
    if(siguiente){
      this.currentPage++;
    }else{
      this.currentPage--;
    }
    const resultado = await this.personajesService.getAll(this.currentPage);
    this.personajes = resultado['results'];
  }
}

