import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../service/data-service';
import { InfosSessions } from '../entities/infosSessions';
import { Note } from '../entities/note';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styles: [],
})
export class NotesPage implements OnInit {

  id: string;
  listeSession: InfosSessions[] = [];

  session = new InfosSessions(null, '', '', '', []);

  note = new Note(null, '');

  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.id = route.snapshot.paramMap.get("id");
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {

      this.id = params.get('id');

      this.dataService.recupererInfosSessions()
        .subscribe(
          result => { this.listeSession = result; }
        );

    });

    this.listeSession.forEach(
      result => {
        const id = parseInt(this.id, 10);
        if (id === result.id) {
          this.session = result;
          if (localStorage.getItem(`${this.session.id}`) != null) {
            this.note.contenu = localStorage.getItem(`${this.session.id}`)
          } else {
            this.note.contenu = 'Saisissez vos notes...';
          }
        }
      }
    );


  }

  enregistrerNotes(noteSaisie: Note) {
    this.note.contenu = noteSaisie.contenu;
    this.note.idSession = parseInt(this.id, 10);
    localStorage.setItem(`${this.note.idSession}`, this.note.contenu);
  }

}
