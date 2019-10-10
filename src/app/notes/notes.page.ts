import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../service/data-service';
import { infosSessions } from '../entities/infosSessions';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.page.html',
  styles: [],
})
export class NotesPage implements OnInit {

  id: string;
  listeSession: infosSessions[] = [];

  session = new infosSessions(null, '', '', '', [])

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
        const id = parseInt(this.id)
        if (id === result.id) {
          this.session = result;
        }
      }
    );
  }

}
