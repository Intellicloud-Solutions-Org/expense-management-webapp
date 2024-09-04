import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPopupsComponent } from './login-popups.component';

describe('LoginPopupsComponent', () => {
  let component: LoginPopupsComponent;
  let fixture: ComponentFixture<LoginPopupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPopupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginPopupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
