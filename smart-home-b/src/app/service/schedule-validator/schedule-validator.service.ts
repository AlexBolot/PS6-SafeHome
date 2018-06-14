import {Injectable} from '@angular/core';
import {Schedule} from '../../model/schedule';
import {ScheduleService} from '../schedules/schedule.service';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ScheduleValidatorService {

  constructor(private scheduleService: ScheduleService) {
  }

  public isScheduleValid(schedule: Schedule, domoticItemID: number): Observable<Boolean> {

    const isValid: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    this.scheduleService.getByDomoticID(domoticItemID).subscribe(schedules => {
      for (const compareItem of schedules) {

        const scheduleStart = new Date(schedule.start);
        const scheduleEnd = new Date(schedule.end);
        const compareItemStart = new Date(compareItem.start);
        const compareItemEnd = new Date(compareItem.end);

        if (scheduleStart.getUTCDay() === compareItemStart.getUTCDay()) {

          const startInSpan = scheduleStart.getTime() >= compareItemStart.getTime() && scheduleStart.getTime() < compareItemEnd.getTime();
          const endInSpan = scheduleEnd.getTime() > compareItemStart.getTime() && scheduleEnd.getTime() <= compareItemEnd.getTime();
          const containsSpan = scheduleStart.getTime() <= compareItemStart.getTime() && scheduleEnd.getTime() >= compareItemEnd.getTime();

          if (startInSpan || endInSpan || containsSpan) {
            if (compareItem.id !== schedule.id) {
              isValid.next(false);
            }
            return;
          }
        }
      }

      isValid.next(true);

    });

    return isValid;
  }

}
