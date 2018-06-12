import {Component, OnInit} from '@angular/core';
import {Domotic} from "../../model/domotic";
import {DomoticService} from "../../service/domotic/domotic.service";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {
  domoticItems: Domotic[] = [];
  displayingTemperature = false;
  clickOnItem = false;

  constructor(private domoticService: DomoticService) {
  }

  ngOnInit() {
    this.domoticService.getAll().subscribe(value => this.domoticItems = value);
  }

  onDomoticItemClick(domoticItem: Domotic) {
    this.displayingTemperature = domoticItem.id == Domotic.thermostatId;
    this.clickOnItem = true;

  }
}
