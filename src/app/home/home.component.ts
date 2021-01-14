import {Component, OnInit} from '@angular/core';
import {ForcastService} from '../services/forcast.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {WeatherModalComponent} from '../current-weather-modal/weather-modal.component';
import {MatDialog} from '@angular/material/dialog';
import {ForcastWeatherModalComponent} from '../forcast-weather-modal/forcast-weather-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  zip = 8001;
  isDark = false;

  constructor(private forecastService: ForcastService,
              private iconRegistry: MatIconRegistry,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  /** Registering the icons*/
  private registerIcons(): void {
    this.iconRegistry.addSvgIcon('menu', this.sanitizer.bypassSecurityTrustResourceUrl('assets/menu.svg'));
  }

  /**
   * Open Pop ups
   */
  openWeatherModal(data: {}, isNew: boolean) {
    const capeTownZip = this.zip;
    const dialogRef = this.dialog.open(WeatherModalComponent,
      {
        data: {payload: data, capeTownZip}
      }
    );
    dialogRef.afterClosed().subscribe();
  }

  openfiveDayForcastModal(data: {}, isNew: boolean) {
    const capeTownZip = this.zip;
    const dialogRef = this.dialog.open(ForcastWeatherModalComponent,
      {
        data: {payload: data, capeTownZip}
      }
    );
    dialogRef.afterClosed().subscribe();
  }

}
