import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ServidorService } from '../../Servidor/servidor.service';
import { Router } from '@angular/router';
import { Celulares } from '../../Entidad/celulares';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './eliminar.component.html',
  styleUrl: './eliminar.component.css',
})
export class EliminarComponent implements OnInit {
  constructor(private router: Router, private service: ServidorService) {}

  cel: Celulares = new Celulares();

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    let id = localStorage.getItem('id');
    this.cel.id = Number(id);
    this.service.buscarCel(this.cel).subscribe(
      (data) => {
        this.cel = data;
        Swal.fire({
          title: 'ELIMINAR',
          text: 'Informacion cargada correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        Swal.fire({
          title: 'ELIMINAR',
          text: 'Error al cargar informacion',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }

	eliminar(){

		const swalWithBootstrapButtons = Swal.mixin({
			customClass: {
				confirmButton: "btn btn-success",
				cancelButton: "btn btn-danger"
			},
			buttonsStyling: false
		});
		swalWithBootstrapButtons.fire({
			title: "Estas seguro?",
			text: "'¡Si confirmas, no se puede revertir!'",
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Si, eliminalo!",
			cancelButtonText: "No, cancelalo!",
			reverseButtons: true
		}).then((result) => {
			if (result.isConfirmed) {
				this.service.eliminarCel(this.cel).subscribe(data =>{

					swalWithBootstrapButtons.fire({
						title: "Eliminado!",
						text: "Registro eliminado correctamente",
						icon: "success"
					});
					this.router.navigate(['listar']);
				});		
				
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				swalWithBootstrapButtons.fire({
					title: "Cancelado",
					text: "Tu archivo esta a salvo :)",
					icon: "error"
				});
			}
		});
	}
}
