import {FarenheitForecastDetails} from './farenheitForecastDetails.model';

export class FarenheitForecastData {
    public name: string;
    // Deatils array of type ForecastDetails class.
    public details: Array<FarenheitForecastDetails> = new Array<FarenheitForecastDetails>();
  }
