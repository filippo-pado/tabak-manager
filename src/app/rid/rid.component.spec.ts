import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidComponent } from './rid.component';

describe('ItemsComponent', () => {
  let component: RidComponent;
  let fixture: ComponentFixture<RidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
