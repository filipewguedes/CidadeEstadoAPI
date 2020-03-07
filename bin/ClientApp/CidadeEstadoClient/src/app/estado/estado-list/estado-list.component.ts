import { Component, OnInit } from '@angular/core';
import { EstadoService } from '../estado.service';
import { EstadoModel } from 'src/app/models/estado';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-estado-list',
  templateUrl: './estado-list.component.html',
  styleUrls: ['./estado-list.component.css'],
  providers:[EstadoService]
})
export class EstadoListComponent implements OnInit {

  estados: EstadoModel[];

  constructor(private service : EstadoService ) { }

  ngOnInit(): void {
    this.service.ListarEstados()
    .subscribe(data => this.estados = data);     
  }

  onDelete(id: string){
    if(confirm("Tem certeza que deseja excluir este estado ?")){
      this.service.ExcluirEstado(id)
    .subscribe(res => console.log(res),
               err => console.error(err),
               () => {
                 let index = this.estados.findIndex(e => e.id == id);
                 this.estados.splice(index,1);
               }  );
    }    
  }
}
