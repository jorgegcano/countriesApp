import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
      li {
        cursor: pointer;
      }
    `,
  ],
})
export class PorPaisComponent implements OnInit {
  public termino: string = '';
  public hayError: boolean = false;
  public paises: Country[] = [];
  public paisesSugeridos: Country[] = [];

  constructor(private paiseServices: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paiseServices.buscarPais(this.termino).subscribe(
      (resp) => {
        console.log(resp);
        this.paises = resp;
      },
      (err) => {
        this.hayError = true;
        this.paises = [];
      }
    );
  }

  public sugerencias(termino: string) {
    this.hayError = false;
    this.paiseServices.buscarPais(termino).subscribe(
      (paises) => (this.paisesSugeridos = paises.splice(0, 8)),
      (err) => (this.paisesSugeridos = [])
    );
  }

  ngOnInit(): void {}
}
