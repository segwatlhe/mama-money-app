import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ForcastService} from '../services/forcast.service';
import {throwError} from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CelsiusForecastData} from '../models/celsius/CelsiusForecastData.model';
import {CelsiusForecastDetails} from '../models/celsius/CelsiusForecastDetails.model';
import {FarenheitForecastData} from '../models/farenheit/farenheitForecastData.model';
import {FarenheitForecastDetails} from '../models/farenheit/farenheitForecastDetails.model';

@Component({
  selector: 'app-forcast-weather-modal',
  templateUrl: './forcast-weather-modal.component.html',
  styleUrls: ['./forcast-weather-modal.component.scss']
})
export class ForcastWeatherModalComponent implements OnInit {

  zip: number;
  showForecast = false;
  showForecast2 = false;
  farenheitForecastData: FarenheitForecastData;
  celsiusForecastData: CelsiusForecastData;
  checked = false;
  private interval: number;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private forecastService: ForcastService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loadForecastWeather(this.data.capeTownZip);
    this.loadForecastWeather2(this.data.capeTownZip);
    this.changed();

    this.interval = setInterval(() => {
      this.forecastService.LoadForecastWeather(this.data.capeTownZip).subscribe(
        data => {
          this.displaySnackBar('Weather App updates every 20 minutes.', 'Close');
        },
        error => {
          this.handleError(error);
          this.displaySnackBar('Weather App did not update.', 'Close');
        }
      );
    },      200000);
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

  /*
 This function is to load the forecast weather. This will subsrcibe from the
 publisher of the URL from the Forecast service which returns an observable.
*/
  // tslint:disable-next-line:typedef
  loadForecastWeather(capeTownZip: any) {
    this.forecastService.LoadForecastWeather(capeTownZip).subscribe(
      res => {
        this.farenheitForecastData = new FarenheitForecastData(); // Instance to store the Data of ForecastModel
        this.farenheitForecastData.name = res.city.name;
        // tslint:disable-next-line:max-line-length
        for (let i = 7; i < res.list.length; i = i + 8)// Since we want for 5 days. it Jumps 8 times to get to next day.(A day had 8 details in API.)
        {
          // Instance of type ForecastDetails and stores the data in it.
          const details = new FarenheitForecastDetails();
          details.date = res.list[i].dt_txt;
          details.maxTemperature = res.list[i].main.temp_max;
          details.minTemperature = res.list[i].main.temp_min;
          details.description = res.list[i].weather[0].description;
          details.icon = res.list[i].weather[0].icon;
          this.farenheitForecastData.details.push(details); // Pushing the data to the to created object

        }
        this.showForecast = true;
      },
      error => {
        this.handleError(error);
        this.displaySnackBar('Unable to access OpenWeatherMap API.', 'Close');
      }
    );
  }

  loadForecastWeather2(capeTownZip: any) {
    this.forecastService.LoadForecastWeather2(capeTownZip).subscribe(
      res => {
        this.celsiusForecastData = new CelsiusForecastData(); // Instance to store the Data of ForecastModel
        this.celsiusForecastData.name = res.city.name;
        // tslint:disable-next-line:max-line-length
        for (let i = 7; i < res.list.length; i = i + 8)// Since we want for 5 days. it Jumps 8 times to get to next day.(A day had 8 details in API.)
        {
          // Instance of type ForecastDetails and stores the data in it.
          const details2 = new CelsiusForecastDetails();
          details2.date = res.list[i].dt_txt;
          details2.maxTemperature = res.list[i].main.temp_max;
          details2.minTemperature = res.list[i].main.temp_min;
          details2.description = res.list[i].weather[0].description;
          details2.icon = res.list[i].weather[0].icon;
          this.celsiusForecastData.details.push(details2); // Pushing the data to the to created object

        }
        this.showForecast2 = true;
      },
      error => {
        this.handleError(error);
        this.displaySnackBar('Unable to access OpenWeatherMap API.', 'Close');
      }
    );
  }

  changed(){
    if (this.checked === true){
      this.loadForecastWeather(this.data.capeTownZip);
    }else{
      this.loadForecastWeather2(this.data.capeTownZip);
    }
  }

  // tslint:disable-next-line:typedef
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
