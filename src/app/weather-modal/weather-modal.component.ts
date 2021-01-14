import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {WeatherData} from '../models/weatherData.model';
import {ForcastService} from '../services/forcast.service';
import {throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-weather-modal',
  templateUrl: './weather-modal.component.html',
  styleUrls: ['./weather-modal.component.scss']
})
export class WeatherModalComponent implements OnInit {
  zip: number;
  showCurrent = false;
  showForecast = false;
  checked = false;
  weatherDetails: WeatherData = new WeatherData();
  private interval: number;
  retry: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private forecastService: ForcastService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadCurrentWeather(this.data.capeTownZip);
    this.loadCurrentWeather2(this.data.capeTownZip);
    this.changed();

    this.interval = setInterval(() => {
      this.forecastService.LoadCurrentWeather(this.data.capeTownZip).subscribe(
        data => {
          this.displaySnackBar('Weather App updates every 20 minutes.', 'Close');
        },
        error => {
          this.retry = error;
          this.handleError(error);
          this.displaySnackBar('Weather App did not update.', 'Close');
        }
      );
    }, 1200000);
  }

  /**
   * Destroy the life cycle hook
   * to prevent update even while user is at different component
   */
  ngOnDestroy() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  /**
   * This will subsrcibe from the publisher of the URL
   * from the Forecast service which returns an observable.
   */
  loadCurrentWeather(capeTownZip: any) {
    this.forecastService.LoadCurrentWeather(capeTownZip).subscribe(
      res => {
        this.weatherDetails.cityName = res.name;
        this.weatherDetails.description = res.weather[0].description;
        this.weatherDetails.currentTemperature = res.main.temp;
        this.weatherDetails.icon = res.weather[0].icon;
        this.weatherDetails.maxTemperature = res.main.temp_max;
        this.weatherDetails.minTemperature = res.main.temp_min;
        this.showCurrent = true;
        this.showForecast = false;
        if (this.weatherDetails.currentTemperature < 15) {
          this.displaySnackBar('It is cold.', 'Close');
        } else {
          this.displaySnackBar('It is hot.', 'Close');
        }
      },
      error => {
        this.retry = error;
        this.handleError(error);
        this.displaySnackBar('Unable to access OpenWeatherMap API.', 'Close');
      }
    );
  }

  loadCurrentWeather2(capeTownZip: any) {
    this.forecastService.LoadCurrentWeather2(capeTownZip).subscribe(
      res => {
        this.weatherDetails.cityName = res.name;
        this.weatherDetails.description = res.weather[0].description;
        this.weatherDetails.currentTemperature = res.main.temp;
        this.weatherDetails.icon = res.weather[0].icon;
        this.weatherDetails.maxTemperature = res.main.temp_max;
        this.weatherDetails.minTemperature = res.main.temp_min;
        this.showCurrent = true;
        this.showForecast = false;
      },
      error => {
        this.retry = error;
        this.handleError(error);
        this.displaySnackBar('Unable to access OpenWeatherMap API.', 'Close');
      }
    );
  }

  changed() {
    if (this.checked === true) {
      this.loadCurrentWeather(this.data.capeTownZip);
    } else {
      this.loadCurrentWeather2(this.data.capeTownZip);
    }
  }

  retryAPI() {
    console.log('retry');
    this.ngOnInit();
  }

  private displaySnackBar(message, action) {
    this.snackBar.open(message, action, {duration: 5000, panelClass: ['custom-style']});
  }

  // error handling
  private handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
      console.log('client-side error ' + errorMessage);
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      console.log('server-side error ' + errorMessage);
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
