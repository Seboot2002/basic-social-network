import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgSendedComponent } from './msg-sended.component';

describe('MsgSendedComponent', () => {
  let component: MsgSendedComponent;
  let fixture: ComponentFixture<MsgSendedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgSendedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgSendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
