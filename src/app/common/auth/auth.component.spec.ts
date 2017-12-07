import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Thin2ComponentsModule } from './../../components/th2-components.module';

import { BaseuriInjectionToken } from './../baseuri.injection.token';
import { HttpWrapper } from './../http.wrapper';
import { Th2ModalComponent } from './../../components/modal/th2-modal.component';
import { SessionStore } from './session.store';

import { AuthComponent } from './auth.component';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';

describe('AuthComponent', () => {
	
	let component: AuthComponent;
	let fixture: ComponentFixture<AuthComponent>;
	
	const routes = [{ path: '', component: AuthComponent }];
	
	beforeEach(async(() => {
		// Compile the components because of their external templates
		TestBed.configureTestingModule({
			imports: [
				HttpModule,
				ReactiveFormsModule,
				RouterTestingModule.withRoutes(routes),
				Thin2ComponentsModule
			],
			declarations: [ AuthComponent ],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				AuthService,
				HttpWrapper,
				SessionStore,
			]
		});
	}));
	
	beforeEach(inject([AuthService], (authService: AuthService) => {
		// Create the component to be tested
		fixture = TestBed.createComponent(AuthComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
		spyOn(component.modal, 'show');
		spyOn(component.modal, 'dismiss');
		spyOn(authService, 'login');
	}));
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
	it('creates a working form', () => {
		// Validate that the form is invalid at this point
		expect(component.authForm.valid).toBeFalsy();
		expect(component.authForm.controls['username'].errors['required']).toBeTruthy();
		expect(component.authForm.controls['password'].errors['required']).toBeTruthy();
		
		// Fill the data and validate the form again
		component.authForm.controls['username'].setValue('username');
		component.authForm.controls['password'].setValue('password');
		expect(component.authForm.valid).toBeTruthy();
	});
	
	it('display login screen', () => {
		component.showLogin();
		
		expect(component.modal.show).toHaveBeenCalled();
	});
	
	it('dismisses login screen', () => {
		component.hideLogin();
		
		expect(component.modal.dismiss).toHaveBeenCalled();
	});
	
	it('performs login', inject([AuthService], (authService: AuthService) => {
		const authModel: AuthModel = new AuthModel('username', 'password');
		component.login(authModel);
		
		expect(authService.login).toHaveBeenCalled();
		expect(authService.login).toHaveBeenCalledWith(authModel);
	}));
	
});
