import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {Task} from '../../model/task';
import {AppSettings} from '../../model/app-settings';
import {User} from '../../model/user';
import {AuthInterceptor} from '../authentication/auth-interceptor';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {

  API_url = AppSettings.API_ROOT + '/Tasks';

  constructor(private httpClient: HttpClient) {
  }

  getAll(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(this.API_url);
  }

  getAuthorById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.API_url + '/' + id + '/author');
  }

  getAsigneeById(id: number): Observable<User> {
    return this.httpClient.get<User>(this.API_url + '/' + id + '/asignee');
  }

  countByIssueID(id: number): Observable<number> {
    return this.httpClient.get<number>(this.API_url + '/count?[where][IDIssue]=' + id);
  }

  toggleStatus(task: Task) {
    task.done = !task.done;

    if (task.done && task.IDAuthor === AuthInterceptor.IOT_ID) {
      console.log('post to domotic');
      this.httpClient.post(AppSettings.API_ROOT + '/Domotic-items/thermometer/activateHeater', true).subscribe(value => {
        console.log(value);
      });
    }

    return this.httpClient.put(this.API_url, task);
  }
}
