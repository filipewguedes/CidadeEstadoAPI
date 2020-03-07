import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EstadoModel } from 'src/app/models/estado';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  })
export class EstadoService {

    apiUrl: string = "http://localhost:3000/estados/";
    token :string;
    httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjNlMTYwMjQ5NzA5MjhlMDcyNWM0YiIsImlhdCI6MTU4MzYxODQ5MCwiZXhwIjo4Nzk4MzYxODQ5MH0.iNvzwwwYaSau9dWI7nEOKbKrD29dK-PLfjsVuFVC_tE'
    })
      };

    constructor(private http:HttpClient) {
        
     }
    
    public SelecionarEstado(id: string) {
        return this.http
        .get<EstadoModel>(this.apiUrl + id, this.httpOptions)  
    }

    public ListarEstados() {
        return this.http
        .get<EstadoModel[]>(this.apiUrl, this.httpOptions)  
    }

    public CriarEstado(estado: any) {
        return this.http
        .post<EstadoModel>(this.apiUrl,estado, this.httpOptions)  
    }

    public AtualizarEstado(estado: any) {
        return this.http
        .put<EstadoModel>(this.apiUrl + estado._id,estado, this.httpOptions)  
    }

    public ExcluirEstado(id: string) {
        return this.http
        .delete(this.apiUrl + id, this.httpOptions)  
    }
}
