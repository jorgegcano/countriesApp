import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styles: [],
})
export class PorCapitalComponent implements OnInit {
  public termino: string = '';
  public hayError: boolean = false;
  public paises: Country[] = [];

  constructor(private paiseServices: PaisService) {}

  buscar(termino: string) {
    this.hayError = false;
    this.termino = termino;
    this.paiseServices.buscarCapital(this.termino).subscribe(
      (resp) => {
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
  }

  ngOnInit(): void {}
}
