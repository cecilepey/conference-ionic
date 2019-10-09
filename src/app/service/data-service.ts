import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, ObservableLike } from 'rxjs';
import { infosConference } from '../entities/infosConference';
import { infosSessions } from '../entities/infosSessions';
import { speakers } from '../entities/speakers';

const URL = 'https://devfest-nantes-2018-api.cleverapps.io';

@Injectable({
    providedIn: 'root'
})
export class DataService {



    constructor(private http: HttpClient) { }



    recupererInfosConference(): Observable<infosConference[]> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true,
        };

        return this.http.get<infosConference[]>(`${URL}/schedule`, httpOptions);
    }

    recupererInfosSessions(): Observable<infosSessions> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true,
        };

        return this.http.get<infosSessions>(`${URL}/sessions`, httpOptions);

    }

    recupererInfosSpeakers(): Observable<speakers> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-type': 'application/json'
            }),
            withCredentials: true,
        };

        return this.http.get<speakers>(`${URL}/speakers`, httpOptions);

    }
}