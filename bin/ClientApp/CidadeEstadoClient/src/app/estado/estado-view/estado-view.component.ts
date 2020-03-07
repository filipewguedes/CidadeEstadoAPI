import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { EstadoModel } from 'src/app/models/estado';
import { EstadoService } from '../estado.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estado-view',
  templateUrl: './estado-view.component.html',
  styleUrls: ['./estado-view.component.css'],
  providers: [ EstadoService ]
})
export class EstadoViewComponent implements OnInit {
  
  estado: EstadoModel;
  id: string;

  constructor(private service : EstadoService, private route: ActivatedRoute ) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params.uid;

    this.service.SelecionarEstado(this.id)
    .subscribe(data => this.estado = data);     
  }
}
