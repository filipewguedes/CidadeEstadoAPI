import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { EstadoService } from '../estado.service';
import { EstadoModel } from 'src/app/models/estado';
import { ActivatedRoute , Router} from '@angular/router';
import { CidadeModel } from 'src/app/models/cidade';
import { CidadeService } from 'src/app/cidade/cidade.service';

@Component({
  selector: 'estado-form',
  templateUrl: './estado-form.component.html',
  styleUrls: ['./estado-form.component.css']
})
export class EstadoFormComponent implements OnInit {
	submitted = false;
  estadoForm: FormGroup;
  estado: EstadoModel;
  id: string;
  editando: boolean;
  closeResult: string;

  constructor(private service: EstadoService, private cidadeService: CidadeService, private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) 
  {   
    this.estado = new EstadoModel({id: "", nome : "", abreviacao : "", cidade: []});

    this.id = this.route.snapshot.params.uid;

    if(this.id){
      this.editando = true;
      this.service.SelecionarEstado(this.id)
      .subscribe(data => {
        this.estado = data;
        this.cidadeService.ListarCidadesPorEstado(this.id).subscribe(cidades =>{
          this.estado.cidades = cidades;
        })
       }
     ); 
    }
  }
  
  nomeInvalido()
  {
  	return (this.submitted && this.estadoForm.controls.nome.errors != null);
  }

  abreviacaoInvalida()
  {
  	return (this.submitted && this.estadoForm.controls.abreviacao.errors != null);
  }

  adicionarCidade(){
    if(!this.estado.cidades)
      this.estado.cidades = [];

    this.estado.cidades.push({id: "", nome: "", idEstado: this.id});

  }

  ngOnInit(): void {
    this.estadoForm = this.formBuilder.group({
  		nome: [null, [Validators.required, Validators.min(4),Validators.max(10)]],
      abreviacao: [null, [Validators.required, Validators.min(2),Validators.max(2)]]
    });
  }

  onSubmit()
  {
  	this.submitted = true;

  	if(this.estadoForm.invalid == true)
  	{
  		return;
  	}
  	else
  	{
      if(this.editando){
        this.service.AtualizarEstado(this.estado)
        .subscribe(
          res => console.log(res),
          error => console.log(error),
          () => {
            this.estado.cidades.forEach( cidade => {
              if(cidade.id){
                this.cidadeService.AtualizarCidade(cidade)
                .subscribe( 
                res => console.log(res),
                error => console.log(error));
              }else{
                this.cidadeService.CriarCidade(cidade)
                .subscribe( 
                res => console.log(res),
                error => console.log(error));
              }
              });
              this.router.navigate(["/estado"]);         
            }
          );            
  
      }else{
        this.service.CriarEstado(this.estado)
        .subscribe(
          res => console.log(res),
          error => console.log(error),
          () => {
            this.estado.cidades.forEach( cidade => {
                this.cidadeService.CriarCidade(cidade)
                    .subscribe( 
                    res => console.log(res),
                    error => console.log(error));              
              });
              this.router.navigate(["/estado"]);         
            }
          );

      }
    }
  }
}
