import {CelsiusForecastDetails} from './CelsiusForecastDetails.model';

export class CelsiusForecastData {
    public name: string;
    // Deatils array of type ForecastDetails class.
    public details: Array<CelsiusForecastDetails> = new Array<CelsiusForecastDetails>();
  }
