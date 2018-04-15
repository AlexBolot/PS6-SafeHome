import {Component, Input, OnInit} from '@angular/core';
import {Issue} from '../../model/issue';
import {CategoryService} from '../../service/category/category.service';
import {StatusService} from '../../service/status/status.service';
import {UrgencyService} from '../../service/urgency/urgency.service';
import {TaskService} from '../../service/task/task.service';
import {Task} from '../../model/task';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {User} from "../../model/user";
import {LocationService} from "../../service/location/location.service";
import {IssueService} from "../../service/issue/issue.service";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.css']
})
export class IssueComponent implements OnInit {

  buttonDetailsIcon: String = 'glyphicon glyphicon-menu-down';
  buttonTasksIcon: String = 'glyphicon glyphicon-menu-down';

  tasks: Task[] = [];
  visibleTasks = false;
  visibleDetails = false;
  categoryLabel: String;
  statusLabel: String;
  urgencyLabel: String;
  locationLabel: String;
  authorName: String;
  countTask: number;
  @Input() issue: Issue;

  constructor(private categoryService: CategoryService,
              private urgencyService: UrgencyService,
              private statusService: StatusService,
              private locationService: LocationService,
              private taskService: TaskService,
              private issueService: IssueService) {
  }

  ngOnInit() {
    this.urgencyService.getByID(this.issue.IDUrgency).subscribe(value => this.urgencyLabel = value);
    this.statusService.getByID(this.issue.IDStatus).subscribe(value => {
      this.statusLabel = value;
      this.issue.status = value
    });
    this.taskService.getAllByIssueID(this.issue.id).subscribe(value => this.tasks = value);
    this.categoryService.getByID(this.issue.categoryId).subscribe(value => this.categoryLabel = value);
    this.taskService.getNbByIdIssue(this.issue.id).subscribe(value => this.countTask = value["count"]);
    this.locationService.getByID(this.issue.IDLocation).subscribe(value => {
      this.locationLabel = value;
      this.issue.location = value
    });

    //  this.fetchAuthorName()

  }

  /* private fetchAuthorName() {
     this.authorName = "None";
     this.authService.getUserName(this.issue.IDAuthor).subscribe(value => {
       this.authorName = value["name"];
       console.log(value)
     });
   }
 */
  showMore() {
    this.visibleDetails = !this.visibleDetails;
    this.buttonDetailsIcon = this.visibleDetails ? 'glyphicon glyphicon-menu-up' : 'glyphicon glyphicon-menu-down';
  }

  showTasks() {
    this.visibleTasks = !this.visibleTasks;
    this.buttonTasksIcon = this.visibleTasks ? 'glyphicon glyphicon-menu-up' : 'glyphicon glyphicon-menu-down';
  }

  changeBackground(): String {
    switch (this.urgencyLabel) {
      case 'Faible':
        return 'yellow';
      case 'Moyenne':
        return 'orange';
      case 'Forte':
        return 'red';
      default:
        return 'bg-default';
    }
  }

  updateStatus(status: boolean) {
    console.log('jesuispasséparlà');
    this.issueService.getByID(this.issue.id).subscribe(value => {
      this.issue = value;
      this.ngOnInit()
    });

  }

}
