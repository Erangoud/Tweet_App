import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalTweetsComponent } from './global-tweets.component';

describe('GlobalTweetsComponent', () => {
  let component: GlobalTweetsComponent;
  let fixture: ComponentFixture<GlobalTweetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlobalTweetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GlobalTweetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
