import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayoneComponent } from './displayone.component';

describe('DisplayoneComponent', () => {
  let component: DisplayoneComponent;
  let fixture: ComponentFixture<DisplayoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
