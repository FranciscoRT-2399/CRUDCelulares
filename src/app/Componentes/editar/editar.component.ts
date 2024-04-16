import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ServidorService } from '../../Servidor/servidor.service';
import { Celulares } from '../../Entidad/celulares';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class EditarComponent implements OnInit {
  //Inyeccion de dependencias
  constructor(private router: Router, private service: ServidorService) {}

  cel: Celulares = new Celulares();

  ngOnInit(): void {
    this.buscar();
  }

  buscar() {
    let id = localStorage.getItem('id');
    //Asignamos el ID recuperado al objeto
    this.cel.id = Number(id);

    this.service.buscarCel(this.cel).subscribe(
      (data) => {
        this.cel = data;
        Swal.fire({
          title: 'EDITAR',
          text: 'Información cargada correctamente',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'EDITAR',
          text: 'Ocurrio un error al cargar la información',
          confirmButtonText: 'OK',
        });
      }
    );
  }

  editar() {
    this.service.editarCel(this.cel).subscribe((data) => {
      Swal.fire({
        text: 'Se edito correctamente la información',
        icon: 'success',
        confirmButtonText: 'ACEPTAR',
      });
      this.router.navigate(['listar']);
    });
  }
}
