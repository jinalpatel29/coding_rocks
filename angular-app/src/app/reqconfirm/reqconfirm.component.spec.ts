import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReqconfirmComponent } from './reqconfirm.component';

describe('ReqconfirmComponent', () => {
  let component: ReqconfirmComponent;
  let fixture: ComponentFixture<ReqconfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReqconfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReqconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
