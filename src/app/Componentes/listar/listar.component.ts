import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServidorService } from '../../Servidor/servidor.service';
import { Celulares } from '../../Entidad/celulares';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './listar.component.html',
  styleUrl: './listar.component.css'
})

export class ListarComponent implements OnInit{

	//Inyeccion de dependencias
	constructor(private router: Router, private service: ServidorService){}

	ngOnInit(): void {
		this.listar();
	}

	//Creamos arreglo de celulares
	celulares !: Celulares[];
	cel : Celulares = new Celulares();

	//Subscribe(data =>{}) almacena la respuesta HTTP como un argumento y la almacena en un elemento del arreglo celulares
	listar(){
		this.service.listarCel().subscribe(data => {
			this.celulares = data;
			console.log('LISTADO EXITOSO')
		});
	}

	editar(cel: Celulares){
		//Guardamos el id del celular en el navegador de manera tamporal
		localStorage.setItem('id', cel.id.toString());
		this.router.navigate(['editar']);
	}

	eliminar(cel: Celulares){
		localStorage.setItem('id', cel.id.toString());
		this.router.navigate(['eliminar']);
	}

	buscarPorMarca(){
		this.service.buscarMarcaCel(this.cel).subscribe(data => {
			this.celulares = data;
		});
	}

}
