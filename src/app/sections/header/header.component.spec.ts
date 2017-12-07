import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { BaseuriInjectionToken } from './../../common/baseuri.injection.token';
import { HttpWrapper } from './../../common/http.wrapper';
import { SessionStore } from './../../common/auth/session.store';

import { AuthEvent } from './../../common/auth/auth.event';
import { AuthComponent } from './../../common/auth/auth.component';
import { AuthModule } from './../../common/auth/auth.module';
import { AuthService } from './../../common/auth/auth.service';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;
	
	const routes = [{ path: '', component: HeaderComponent }];
	
	beforeEach(async(() => {
		// Compile the components because of their external templates
		TestBed.configureTestingModule({
			imports: [ 
				AuthModule.forRoot(),
				CommonModule,
				HttpModule,
				RouterTestingModule.withRoutes(routes)
			],
			declarations: [ HeaderComponent ],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				HttpWrapper,
				SessionStore
			],
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		// Create the component to be tested
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
		spyOn(component.authComponent, 'showLogin');
		spyOn(component.authComponent, 'hideLogin');
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
	it('initializes well (login success)', async(inject([AuthService], (authService: AuthService) => {
		const authEvent = new AuthEvent(true, 'damoresa', undefined);
		spyOn(authService, 'sessionStatus').and.returnValue(Observable.of(authEvent));
		
		component.ngOnInit();
		fixture.detectChanges();
		
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			expect(component.authComponent.hideLogin).toHaveBeenCalled();
			expect(authService.sessionStatus).toHaveBeenCalled();
			expect(component.username).toBe(authEvent.username);
			expect(component.authenticated).toBe(authEvent.authed);
		});
	})));
	
	it('initializes well (login failure)', async(inject([AuthService], (authService: AuthService) => {
		const authEvent = new AuthEvent(false, undefined, undefined);
		spyOn(authService, 'sessionStatus').and.returnValue(Observable.of(authEvent));
		
		component.ngOnInit();
		fixture.detectChanges();
		
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			expect(authService.sessionStatus).toHaveBeenCalled();
			expect(component.username).toBe('');
			expect(component.authenticated).toBe(authEvent.authed);
		});
	})));
	
	it('initializes well (login error)', async(inject([AuthService], (authService: AuthService) => {
		spyOn(authService, 'sessionStatus').and.returnValue(Observable.throw({status: 500}));
		
		component.ngOnInit();
		fixture.detectChanges();
		
		fixture.whenStable().then(() => {
			fixture.detectChanges();
			expect(authService.sessionStatus).toHaveBeenCalled();
			expect(component.username).not.toBeDefined();
			expect(component.authenticated).toBe(false);
		});
	})));
	
	it('destroys well', inject([AuthService], (authService: AuthService) => {
		const authEvent = new AuthEvent(true, 'damoresa', undefined);
		spyOn(authService, 'sessionStatus').and.returnValue(Observable.of(authEvent));
		
		component.ngOnInit();
		component.ngOnDestroy();
	}));
	
	it('displays login', () => {
		component.login();
		
		expect(component.authComponent.showLogin).toHaveBeenCalled();
	});
	
	it('logs out', inject([AuthService, Router], (authService: AuthService, router: Router) => {
		spyOn(authService, 'logout');
		spyOn(router, 'navigate');
		
		component.logout();
		
		expect(authService.logout).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalled();
		expect(router.navigate).toHaveBeenCalledWith(['/']);
	}));
	
});
