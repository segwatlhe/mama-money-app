import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherModalComponent } from './weather-modal.component';

describe('WeatherModalComponent', () => {
  let component: WeatherModalComponent;
  let fixture: ComponentFixture<WeatherModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
