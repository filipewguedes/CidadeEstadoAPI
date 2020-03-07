import { Component, OnInit } from '@angular/core';
import { CidadeService } from '../cidade.service';
import { EstadoService } from 'src/app/estado/estado.service';
import { EstadoModel } from 'src/app/models/estado';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeModel } from 'src/app/models/cidade';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cidade-form',
  templateUrl: './cidade-form.component.html',
  styleUrls: ['./cidade-form.component.css']
})
export class CidadeFormComponent implements OnInit {

  estados: EstadoModel[];

  submitted = false;
  cidadeForm: FormGroup;
  cidade: CidadeModel;
  id: string;
  editando: boolean;
  estadoSelecionado: string;

  constructor(private service : CidadeService, private estadoService : EstadoService, private route: ActivatedRoute, private router: Router,private formBuilder: FormBuilder) { 
    this.cidade = new CidadeModel({id: "", nome : "", idEstado : ""});
   
    this.id = this.route.snapshot.params.uid;

    if(this.id){
      this.editando = true;
      this.service.SelecionarCidade(this.id)
      .subscribe(data => this.cidade = data); 
    }
  }

  ngOnInit(): void {
    this.estadoService.ListarEstados()
    .subscribe(data => {this.estados = data; });

    this.cidadeForm = this.formBuilder.group({
  		nome: [null, [Validators.required, Validators.min(4),Validators.max(10)]]  	
    });
  }

  nomeInvalido()
  {
  	return (this.submitted && this.cidadeForm.controls.nome.errors != null);
  }

  onSubmit()
  {
    this.submitted = true;

  	if(this.cidadeForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
      if(this.editando){
        this.service.AtualizarCidade(this.cidade)
        .subscribe(
          res => this.cidade = res,
          error => console.log(error),
          () => this.router.navigate(["/"])
          );
            
  
      }else{
        this.service.CriarCidade(this.cidade)
        .subscribe(
          res => this.cidade = res,
          error => console.log(error),
          () => this.router.navigate(["/"])
          );

      }
    }
  }

}
