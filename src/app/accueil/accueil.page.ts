import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styles: [],
})
export class AccueilPage implements OnInit {

  dateDebut: Date;
  dateFin: Date;

  constructor(private dataService: DataService) { }

  ngOnInit() {


    if (localStorage.getItem('dateDebut') && localStorage.getItem('dateFin')) {
      this.dateDebut = new Date(localStorage.getItem('dateDebut'));
      this.dateFin = new Date(localStorage.getItem('dateFin'));
    } else {
      this.dataService.recupererInfosConference()
        .subscribe(
          info => {
            this.dateDebut = new Date(info[0].date);
            this.dateFin = new Date(info[1].date);
            localStorage.setItem('dateDebut', info[0].date);
            localStorage.setItem('dateFin', info[1].date);
          }, err => { }
        )
    }
  }

}
