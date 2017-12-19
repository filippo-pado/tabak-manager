import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidsComponent } from './rids.component';

describe('ItemsComponent', () => {
  let component: RidsComponent;
  let fixture: ComponentFixture<RidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RidsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
