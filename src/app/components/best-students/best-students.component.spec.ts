import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestStudentsComponent } from './best-students.component';

describe('BestStudentsComponent', () => {
  let component: BestStudentsComponent;
  let fixture: ComponentFixture<BestStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
