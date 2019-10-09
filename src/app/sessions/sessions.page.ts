import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data-service';
import { infosSessions } from '../entities/infosSessions';
import { speakers } from '../entities/speakers';

@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.page.html',
  styleUrls: ['./sessions.page.scss'],
})
export class SessionsPage implements OnInit {

  listeTitre: string[] = [];

  affichageSession = false;

  session: infosSessions = new infosSessions('', '', '', []);

  listeSession: infosSessions[] = [];

  listeSpeakers: speakers[] = [];

  listeSpeakersSession: speakers[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {

    this.dataService.recupererInfosSessions()
      .subscribe(
        info => {
          Object.values(info).forEach(
            result => {
              this.listeSession.push(result)
              if (result.titleMobile != null) {
                this.listeTitre.push(result.titleMobile)
              } else {
                this.listeTitre.push(result.title)
              }
            }
          )
        }
      )
    this.dataService.recupererInfosSpeakers()
      .subscribe(
        info => {
          Object.values(info).forEach(
            result => {
              this.listeSpeakers.push(result)
            }
          )
        }
      )

  }

  afficherDetails(titre: string) {

    this.listeSession.forEach(
      result => {
        if (titre === result.title || titre === result.titleMobile) {
          this.session = result;
          this.affichageSession = true;
          if (this.session.speakers.length > 0) {
            this.session.speakers.forEach(
              intervenant => {
                this.listeSpeakers.forEach(
                  resultat => {
                    if (intervenant === resultat.id) {
                      resultat.photoUrl = 'https://devfest-nantes-2018-api.cleverapps.io' + resultat.photoUrl;
                      this.listeSpeakersSession.push(resultat)
                    }
                  }
                )
              }
            )
          }
        }
      }
    )

  }

}
