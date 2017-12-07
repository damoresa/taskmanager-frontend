import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HttpModule } from '@angular/http';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

import { BaseuriInjectionToken } from './../baseuri.injection.token';
import { HttpWrapper } from './../http.wrapper';

import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SessionStore } from './session.store';

// We need to create a variable for the Jasmine context variable
declare const jasmine;

describe('AuthGuard', () => {
	
	// Create a RouterStateSnapshot Jasmine spy object
	const stateSnapshotMock = jasmine.createSpyObj("RouterStateSnapshot", ['toString']);
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			imports: [
				HttpModule,
				RouterTestingModule.withRoutes([]),
			],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				AuthGuard,
				AuthService,
				HttpWrapper,
				SessionStore
			]
		});
		
		// Initialize the component data
	});
	
	it('creates an instance', inject([AuthGuard],(authGuard: AuthGuard) => {
		expect(authGuard).toBeDefined();
	}));
	
	it('validates route activation (with auth)', inject([AuthGuard, AuthService],
		(authGuard: AuthGuard, authService: AuthService) => {
			spyOn(authService, 'isAuthed').and.returnValue(true);
			
			// No data is extracted from either route
			const canActivate = authGuard.canActivate(new ActivatedRouteSnapshot(), stateSnapshotMock);
			
			expect(canActivate).toBeTruthy();
	}));
	
	it('validates route activation (without auth)', inject([AuthGuard, AuthService, Router],
		(authGuard: AuthGuard, authService: AuthService, router: Router) => {
			spyOn(authService, 'isAuthed').and.returnValue(false);
			spyOn(router, 'navigate');
			
			const canActivate = authGuard.canActivate(new ActivatedRouteSnapshot(), stateSnapshotMock);
			
			expect(canActivate).toBeFalsy();
			expect(router.navigate).toHaveBeenCalled();
			expect(router.navigate).toHaveBeenCalledWith(['/']);
	}));
	
});
