import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServidorService } from '../../Servidor/servidor.service';
import { Celulares } from '../../Entidad/celulares';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-guardar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guardar.component.html',
  styleUrl: './guardar.component.css'
})
export class GuardarComponent {

	//Inyeccion de dependecias
	constructor(private router: Router, private service: ServidorService){}

	cel : Celulares = new Celulares();

	guardar(){
		this.service.guardarCel(this.cel).subscribe(data => {
				Swal.fire({
					title: 'Guardado',
					text: 'Celular guardado correctamente',
					icon: 'success',
					confirmButtonText: 'OK'
				});
				this.router.navigate(['listar']);
			},
			error => {
				Swal.fire({
					title: 'Error',
					text: 'Error al guardar el celular',
					icon: 'error',
					confirmButtonText: 'OK'
			});
		});
	}	
}
