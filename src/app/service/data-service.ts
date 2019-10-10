import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { InfosConference } from '../entities/infosConference';
import { InfosSessions } from '../entities/infosSessions';
import { Speakers } from '../entities/speakers';

const URL = 'https://devfest-nantes-2018-api.cleverapps.io';

@Injectable({
    providedIn: 'root'
})
export class DataService {


    constructor(private http: HttpClient) { }


    /**
     *méthode qui  permet de récupérer les informations de la conférence
     *
     * @returns {Observable<infosConference[]>}
     * @memberof DataService
     */
    recupererInfosConference(): Observable<InfosConference[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true,
        };

        return this.http.get<InfosConference[]>(`${URL}/schedule`, httpOptions);
    }

    /**
     *méthode qui permet de récupérer les infos des sessions
     *
     * @returns {Observable<InfosSessions>}
     * @memberof DataService
     */
    recupererInfosSessions(): Observable<InfosSessions[]> {

        const localInfosSessions = localStorage.getItem('session');

        if (localInfosSessions) {
            return of(JSON.parse(localInfosSessions));
        } else {
            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-type': 'application/json'
                }),
                withCredentials: true,
            };

            return this.http.get(`${URL}/sessions`, httpOptions)
                .pipe(
                    map(objAvecSessions => Object.values(objAvecSessions) as InfosSessions[]),
                    tap(iSessions => localStorage.setItem('session', JSON.stringify(iSessions)))
                );
        }
    }

    /**
     *méthode qui permet de récupérer les infos des speakers
     *
     * @returns {Observable<Speakers>}
     * @memberof DataService
     */
    recupererInfosSpeakers(): Observable<Speakers[]> {

        const localSpeakers = localStorage.getItem('speaker');

        if (localSpeakers) {
            return of(JSON.parse(localSpeakers));
        } else {

            const httpOptions = {
                headers: new HttpHeaders({
                    'Content-type': 'application/json'
                }),
                withCredentials: true,
            };

            return this.http.get(`${URL}/speakers`, httpOptions)
                .pipe(
                    map(objAvecSpeakers => Object.values(objAvecSpeakers) as Speakers[]),
                    tap(result => localStorage.setItem('speaker', JSON.stringify(result)))
                )
        }
    }


}