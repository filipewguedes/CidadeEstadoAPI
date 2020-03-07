import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../cidade.service';
import { EstadoService } from 'src/app/estado/estado.service';
import { EstadoModel } from 'src/app/models/estado';
import { CidadeModel } from 'src/app/models/cidade';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cidade-view',
  templateUrl: './cidade-view.component.html',
  styleUrls: ['./cidade-view.component.css'],
  providers: [ EstadoService, CidadeService ]
})
export class CidadeViewComponent implements OnInit {
  
  estado: EstadoModel;
  cidade: CidadeModel;
  id: string;

  constructor(private service : CidadeService,private estadoService : EstadoService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.uid;
    
    this.service.SelecionarCidade(this.id)
    .subscribe(data => {
      this.cidade = data;
      this.estadoService.SelecionarEstado(this.cidade.idEstado)
      .subscribe(data => this.estado = data);  
    });  
  }

}
