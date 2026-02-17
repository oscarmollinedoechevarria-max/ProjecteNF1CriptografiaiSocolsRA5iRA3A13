import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adminconsole } from './adminconsole';

describe('Adminconsole', () => {
  let component: Adminconsole;
  let fixture: ComponentFixture<Adminconsole>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adminconsole]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adminconsole);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
