import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgReceivedComponent } from './msg-received.component';

describe('MsgReceivedComponent', () => {
  let component: MsgReceivedComponent;
  let fixture: ComponentFixture<MsgReceivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgReceivedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
