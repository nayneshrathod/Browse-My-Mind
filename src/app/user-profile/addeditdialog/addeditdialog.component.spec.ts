import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditdialogComponent } from './addeditdialog.component';

describe('AddeditdialogComponent', () => {
  let component: AddeditdialogComponent;
  let fixture: ComponentFixture<AddeditdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditdialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
