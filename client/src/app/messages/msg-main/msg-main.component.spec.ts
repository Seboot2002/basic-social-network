import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgMainComponent } from './msg-main.component';

describe('MsgMainComponent', () => {
  let component: MsgMainComponent;
  let fixture: ComponentFixture<MsgMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
