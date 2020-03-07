import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CidadeModel } from 'src/app/models/cidade';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class CidadeService {

    apiUrl: string = "http://localhost:3000/cidades/";
    constructor(private http:HttpClient) { }
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjNlMTYwMjQ5NzA5MjhlMDcyNWM0YiIsImlhdCI6MTU4MzYxODQ5MCwiZXhwIjo4Nzk4MzYxODQ5MH0.iNvzwwwYaSau9dWI7nEOKbKrD29dK-PLfjsVuFVC_tE'
    })
      };
    public SelecionarCidade(id: string) {
        return this.http
        .get<CidadeModel>(this.apiUrl + id,this.httpOptions)  
    }

    public ListarCidades() {
        return this.http
        .get<CidadeModel[]>(this.apiUrl,this.httpOptions)  
    }

    public ListarCidadesPorEstado(id: string) {
        return this.http
        .get<CidadeModel[]>(this.apiUrl + "?idEstado=" + id,this.httpOptions);
    }

    public CriarCidade(Cidade: any) {
        return this.http
        .post<CidadeModel>(this.apiUrl,Cidade,this.httpOptions)  
    }

    public AtualizarCidade(Cidade: any) {
        return this.http
        .put<CidadeModel>(this.apiUrl + Cidade._id,Cidade,this.httpOptions)  
    }

    public ExcluirCidade(id: string) {
        return this.http
        .delete(this.apiUrl + id,this.httpOptions)  
    }
}