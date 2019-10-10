import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../service/data-service';
import { infosSessions } from '../entities/infosSessions';
import { note } from '../entities/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styles: [],
})
export class NotesPage implements OnInit {

  id: string;
  listeSession: infosSessions[] = [];

  session = new infosSessions(null, '', '', '', []);

  note = new note(null, '');

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.id = route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {

      this.id = params.get('id');

    });

    if (localStorage.getItem('session') === null) {
      this.dataService.recupererInfosSessions()
        .subscribe(
          info => {
            Object.values(info).forEach(
              result => {
                this.listeSession.push(result)

              }
            );
            localStorage.setItem('session', JSON.stringify(this.listeSession));
          }
        )
    } else {
      this.listeSession = JSON.parse(localStorage.getItem('session'));
    }

    this.listeSession.forEach(
      result => {
        const id = parseInt(this.id, 10);
        if (id === result.id) {
          this.session = result;
          if (localStorage.getItem(`${this.session.id}`) != null) {
            this.note.contenu = localStorage.getItem(`${this.session.id}`)
          } else {
            this.note.contenu = 'Saisissez vos notes...'
          }
        }
      }
    );


  }

  enregistrerNotes(note: note) {
    this.note.contenu = note.contenu;
    this.note.idSession = parseInt(this.id, 10);
    localStorage.setItem(`${this.note.idSession}`, this.note.contenu)
  }

}
