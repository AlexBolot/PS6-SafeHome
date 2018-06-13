import {Injectable} from '@angular/core';
import {Issue} from '../../model/issue';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {AppSettings} from '../../model/app-settings';
import {TaskService} from '../task/task.service';
import {CategoryService} from '../category/category.service';
import {Task} from '../../model/task';
import {StatusService} from '../status/status.service';
import {LocationService} from '../location/location.service';
import {log} from 'util';

@Injectable()
export class IssueService {

  private weekSpan = 604800000;
  API_url = AppSettings.API_ROOT + '/Issues';

  constructor(private httpClient: HttpClient, private categoryService: CategoryService,
              private taskService: TaskService) {
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

  put(issue: Issue) {
    return this.httpClient.put<Issue>(this.API_url, issue);
  }

  getDeclared(id: number, archivedToo: boolean = false): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {

      this.checkArchive(issues);

      const map: Issue[] = [];
      issues.forEach(issue => {
        if (issue.IDAuthor === id) {
          if (archivedToo || issue.IDStatus !== Issue.ArchivedID) {
            map.push(issue);
          }
        }
      });
      return map;
    });
  }

  getAssignee(id: number, archivedToo: boolean = false): Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(this.API_url).map(issues => {

      this.checkArchive(issues);

      const map: Issue[] = [];
      issues.forEach(issue => this.taskService.getAllByIssueID(issue.id).subscribe(tasks => {
        if (tasks.filter(task => task.IDAssignee === id).length > 0) {
          if (archivedToo || issue.IDStatus !== Issue.ArchivedID) {
            map.push(issue);
          }
        }
      }));
      return map;
    });
  }

  getSortedByDate(issues: Issue[]): Issue[] {
    return issues.sort((issue1, issue2): number => {
      if (new Date(issue1.Date) < new Date(issue2.Date)) {
        return 1;
      }
      if (new Date(issue1.Date) > new Date(issue2.Date)) {
        return -1;
      }
      return 0;
    });
  }

  getSortedByImportance(issues: Issue[]): Issue[] {
    return issues.sort((issue1, issue2): number => {
      if (issue1.IDUrgency < issue2.IDUrgency) {
        return 1;
      }
      if (issue1.IDUrgency > issue2.IDUrgency) {
        return -1;
      }
      return 0;
    });
  }

  getFilter(issues: Issue[], input: string): Issue[] {
    return issues.filter(issue => issue.Title.toUpperCase().includes(input.toUpperCase())
      || (issue.Description != null && issue.Description.toUpperCase().includes(input.toUpperCase()))
      || (issue.category != null && issue.category.toUpperCase().includes(input.toUpperCase()))
      || (issue.locationName != null && issue.locationName.toUpperCase().includes(input.toUpperCase()))
      || (issue.statusName != null && issue.statusName.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(input.toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')))
    );
  }

  getCountByState(issues: Issue[], issueState: number) {
    return issues.filter(issue => issue.IDStatus === issueState).length;
  }

  checkArchive(issues: Issue[]) {
    issues.forEach(issue => {
      if (issue.IDStatus === 3 && issue.DateDone !== undefined) {
        const eventStartTime = new Date(issue.DateDone);
        const eventEndTime = new Date();
        const duration = eventEndTime.valueOf() - eventStartTime.valueOf();

        if (duration > this.weekSpan) {
          log('archiving issue n°' + issue.id);
          issue.IDStatus = 4;
          this.put(issue);
        }
      }
    });
  }
}
