import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Celulares } from '../Entidad/celulares';

@Injectable({
  providedIn: 'root',
})
export class ServidorService {
  //Inyeccion de dependencia en el constructor del servidor

  constructor(private http: HttpClient) {}

  //Conexion con el WS
  url = 'http://localhost:8005/celulares';

  //Declaracion de los metodos controladores del backend
  listarCel() {
    return this.http.get<Celulares[]>(this.url + '/listar');
  }

  guardarCel(cel: Celulares) {
    return this.http.post<string>(this.url + '/guardar', cel);
  }

	buscarCel(cel: Celulares) {
		return this.http.post<Celulares>(this.url + '/buscar', cel);
	}

	editarCel(cel: Celulares) {
		return this.http.post<string>(this.url + '/editar', cel);
	}

	eliminarCel(cel: Celulares) {
		return this.http.post<string>(this.url + '/eliminar', cel);
	}

	//Metodo personalizado
	buscarMarcaCel(cel: Celulares) {
		return this.http.post<Celulares[]>(this.url + '/buscarPorMarca', cel);
	}
}
