import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BouncingBoubleComponent } from './bouncing-bouble.component';

describe('BouncingBoubleComponent', () => {
  let component: BouncingBoubleComponent;
  let fixture: ComponentFixture<BouncingBoubleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BouncingBoubleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BouncingBoubleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
