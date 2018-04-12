import {Injectable} from '@angular/core';
import {Issue} from '../../model/issue';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../model/app-settings';
import {TaskService} from '../task/task.service';

@Injectable()
export class IssueService {

  API_url = AppSettings.API_ROOT + '/Issues';

  constructor(private httpClient: HttpClient, private taskService: TaskService) {
  }

  getAll(): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url);
  }

  getByID(id: number): Observable<Issue> {
    return this.httpClient.get<Issue>(this.API_url + '/' + id);
  }

  add(issue: Issue) {
    console.log(issue);
    return this.httpClient.post<JSON>(this.API_url, issue);
  }

  getDeclaredBy(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => issue.IDAuthor === id)
        .sort((issue1, issue2): number => {
          if (issue1.DeclarationDate < issue2.DeclarationDate) {
            return 1;
          }
          if (issue1.DeclarationDate > issue2.DeclarationDate) {
            return -1;
          }
          return 0;
        }));
  }

  getAssignedTo(id: number): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url)
      .map(issues => issues.filter(issue => new TaskService(this.httpClient).getByID(issue.id)
        .map(tasks => tasks.IDAssignee === id)).sort((issue1, issue2): number => {
        if (issue1.IDUrgency < issue2.IDUrgency) {
          return 1;
        }
        if (issue1.IDUrgency > issue2.IDUrgency) {
          return -1;
        }
        return 0;
      }));
  }
}
