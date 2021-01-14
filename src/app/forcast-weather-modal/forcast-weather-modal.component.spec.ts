import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForcastWeatherModalComponent } from './forcast-weather-modal.component';

describe('ForcastWeatherModalComponent', () => {
  let component: ForcastWeatherModalComponent;
  let fixture: ComponentFixture<ForcastWeatherModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForcastWeatherModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForcastWeatherModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
