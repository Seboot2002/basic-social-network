import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MsgAddComponent } from './msg-add.component';

describe('MsgAddComponent', () => {
  let component: MsgAddComponent;
  let fixture: ComponentFixture<MsgAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MsgAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MsgAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
