import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../cidade.service';
import { CidadeModel } from 'src/app/models/cidade';

@Component({
  selector: 'app-cidade-list',
  templateUrl: './cidade-list.component.html',
  styleUrls: ['./cidade-list.component.css'],
  providers:[CidadeService]
})
export class CidadeListComponent implements OnInit {

  cidades: CidadeModel[];

  constructor(private service : CidadeService ) { }

  ngOnInit(): void {
    this.service.ListarCidades()
    .subscribe(data => this.cidades = data); 
  }

  onDelete(id: string){
    if(confirm("Tem certeza que deseja excluir esta cidade ?")){
      this.service.ExcluirCidade(id)
    .subscribe(res => console.log(res),
               err => console.error(err),
               () => {
                 let index = this.cidades.findIndex(e => e.id == id);
                 this.cidades.splice(index,1);
               }  );
    }    
  }

}
