import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecitationComponent } from './decitation.component';

describe('DecitationComponent', () => {
  let component: DecitationComponent;
  let fixture: ComponentFixture<DecitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecitationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
