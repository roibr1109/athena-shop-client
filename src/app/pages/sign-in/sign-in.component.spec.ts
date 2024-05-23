import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { SignInService } from 'src/app/services/sign-in.service';
import { instance, mock } from 'ts-mockito';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { FormsModule } from '@angular/forms';

const signInServiceMock: SignInService = mock(SignInService);

 describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  let mockRouter = {
    navigate : jest.fn()
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SimpleNotificationsModule.forRoot(), FormsModule ],
      declarations: [ SignInComponent ],
      providers: [{provide: SignInService, useValue: instance(signInServiceMock)},
        {provide: Router, useValue: mockRouter}],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
