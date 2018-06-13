import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../model/app-settings';

@Injectable()
export class StatusService {

  API_url = AppSettings.API_ROOT + '/Statuses';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Map<Number, String>> {
    return this.httpClient.get<JSON[]>(this.API_url).map(json => {
        const map: Map<Number, String> = new Map<Number, String>();
        json.forEach(field => map.set(field['id'], field['Name']));
        return map;
      }
    );
  }

  getByID(id: number): Observable<String> {
    return this.httpClient.get<JSON>(this.API_url + '/' + id)
      .map(res => res['Name']);
  }
}
