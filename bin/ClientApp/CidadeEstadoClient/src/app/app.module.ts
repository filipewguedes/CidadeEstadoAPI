import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { Routes, RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { EstadoFormComponent } from './estado/estado-form/estado-form.component';
import { EstadoViewComponent } from './estado/estado-view/estado-view.component';
import { EstadoListComponent } from './estado/estado-list/estado-list.component';
import { CidadeFormComponent } from './cidade/cidade-form/cidade-form.component';
import { CidadeViewComponent } from './cidade/cidade-view/cidade-view.component';
import { CidadeListComponent } from './cidade/cidade-list/cidade-list.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'estado',
    component: EstadoListComponent
  },  
  {
    path: 'estado/criar',
    component: EstadoFormComponent
  },
  {
    path: 'estado/editar/:uid',
    component: EstadoFormComponent
  },
  {
    path: 'estado/:uid',
    component: EstadoViewComponent
  },
  {
    path: 'cidade',
    component: CidadeListComponent
  },  
  {
    path: 'cidade/criar',
    component: CidadeFormComponent
  },
  {
    path: 'cidade/editar/:uid',
    component: CidadeFormComponent
  },
  {
    path: 'cidade/:uid',
    component: CidadeViewComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EstadoFormComponent,
    EstadoViewComponent,
    EstadoListComponent,
    CidadeFormComponent,
    CidadeViewComponent,
    CidadeListComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)        
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
