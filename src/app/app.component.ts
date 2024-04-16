// * COMPONENTE PRINCIPAL
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CRUDCelulares';

	constructor(private router: Router){}
	
		listar(){
			this.router.navigate(['/listar']);
		}
		nuevo(){
			this.router.navigate(['/guardar']);
		}
}
