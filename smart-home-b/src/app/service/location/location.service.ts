import { Injectable } from '@angular/core';
import {AppSettings} from '../../model/app-settings';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Task} from '../../model/task';

@Injectable()
export class LocationService {

  API_url = AppSettings.API_ROOT + '/Locations';
  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<JSON[]>(this.API_url).map(json => {
        const map: Map<Number, String> = new Map<Number, String>();
        json.forEach(field => map.set(field['id'], field['Name']));
        return map;
      }
    );
  }
  getLabels(): Observable<String[]> {
    return this.httpClient.get<JSON[]>(this.API_url).map(json => {
      const res: String[] = [];
      json.forEach(field => res.push(field['Name']));
      return res;
    });
  }

  getByID(id: number): Observable<String> {
    return this.httpClient.get<JSON>(this.API_url + '/' + id)
      .map(res => res['Name']);
  }
}