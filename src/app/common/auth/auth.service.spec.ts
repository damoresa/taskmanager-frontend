import { inject, TestBed } from '@angular/core/testing';

import { Headers, HttpModule, RequestOptions, Response, ResponseOptions, ResponseOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { BaseuriInjectionToken } from './../baseuri.injection.token';
import { HttpWrapper } from './../http.wrapper';

import { AuthEvent } from './auth.event';
import { AuthModel } from './auth.model';
import { AuthService } from './auth.service';
import { SessionStore } from './session.store';

// We need to create a variable for the Jasmine context variable
declare const jasmine;

describe('AuthService', () => {
	
	const token = 'EXTOKEN';
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			imports: [
				HttpModule
			],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				AuthService,
				HttpWrapper,
				SessionStore
			]
		});
		
		// Initialize the component data
	});
	
	it('creates an instance', inject([AuthService],(authService: AuthService) => {
		expect(authService).toBeDefined();
	}));
	
	it('handles login (success)', inject([AuthService, HttpWrapper],
		(authService: AuthService, httpWrapper: HttpWrapper) => {
			const sessionStatusSubject = authService.sessionStatusSubject();
			spyOn(sessionStatusSubject, 'next');
			
			const response: Response = new Response({
				'body': { 'token': token },
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'post').and.returnValue(Observable.of(response));
			
			const authModel: AuthModel = new AuthModel('username', 'password');
			const authEvent = new AuthEvent(true, authModel.username, `${authModel.username} succesfully logged in`);
			authService.login(authModel);
			
			expect(httpWrapper.post).toHaveBeenCalled();
			expect(httpWrapper.post).toHaveBeenCalledWith(
				jasmine.any(String),
				authModel,
				jasmine.any(RequestOptions)
			);
			expect(sessionStatusSubject.next).toHaveBeenCalled();
			expect(sessionStatusSubject.next).toHaveBeenCalledWith(authEvent);
	}));
	
	it('handles login (error)', inject([AuthService, HttpWrapper],
		(authService: AuthService, httpWrapper: HttpWrapper) => {
			const sessionStatusSubject = authService.sessionStatusSubject();
			spyOn(sessionStatusSubject, 'next');
			
			const response: Response = new Response({
				'body': { 'error': 'Internal server error' },
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 500,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'post').and.returnValue(Observable.throw(response));
			
			const authModel: AuthModel = new AuthModel('username', 'password');
			const authEvent = new AuthEvent(false, authModel.username, `Error when logging in as ${authModel.username}`);
			authService.login(authModel);
			
			expect(httpWrapper.post).toHaveBeenCalled();
			expect(httpWrapper.post).toHaveBeenCalledWith(
				jasmine.any(String),
				authModel,
				jasmine.any(RequestOptions)
			);
			expect(sessionStatusSubject.next).toHaveBeenCalled();
			expect(sessionStatusSubject.next).toHaveBeenCalledWith(authEvent);
	}));
	
	it('handles if user is authenticated (true)', inject([AuthService, SessionStore],
		(authService: AuthService, sessionStore: SessionStore) => {
			// Property spies are not supported on my current version of Jasmine, so this 
			// ugly workaround is in order: manually create a spy and attach it to the object
			const token = 'EXTOKEN';
			const getSpy = jasmine.createSpy().and.returnValue(token);
			Object.defineProperty(sessionStore, 'token', { get: getSpy });
			
			const isUserAuthed = authService.isAuthed();
			
			expect(isUserAuthed).toBeTruthy();
	}));
	
	it('handles if user is authenticated (false)', inject([AuthService, SessionStore],
		(authService: AuthService, sessionStore: SessionStore) => {
			// Property spies are not supported on my current version of Jasmine, so this 
			// ugly workaround is in order: manually create a spy and attach it to the object
			const token = undefined;
			const getSpy = jasmine.createSpy().and.returnValue(token);
			Object.defineProperty(sessionStore, 'token', { get: getSpy });
			
			const isUserAuthed = authService.isAuthed();
			
			expect(isUserAuthed).toBeFalsy();
	}));
	
	it('retrieves session information', inject([AuthService, HttpWrapper],
		(authService: AuthService, httpWrapper: HttpWrapper) => {
			const sessionInformation = { 'session': true, 'username': 'username' };
			const response: Response = new Response({
				'body': sessionInformation,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'get').and.returnValue(Observable.of(response));
			
			authService.sessionInfo().subscribe(
				(sessionInfo) => {
					expect(sessionInfo).toBe(sessionInformation);
				},
				(error) => { console.error(' # ERROR # Unable to retrieve session info '); }
			);
			
			expect(httpWrapper.get).toHaveBeenCalled();
			expect(httpWrapper.get).toHaveBeenCalledWith(jasmine.any(String));
	}));
	
	it('handles logout', inject([AuthService, SessionStore],
		(authService: AuthService, sessionStore: SessionStore) => {
			const sessionStatusSubject = authService.sessionStatusSubject();
			spyOn(sessionStatusSubject, 'next');
			spyOn(sessionStore, 'clearToken');
			
			const authEvent = new AuthEvent(false, '', 'User logged out');
			authService.logout();
			
			expect(sessionStore.clearToken).toHaveBeenCalled();
			expect(sessionStatusSubject.next).toHaveBeenCalled();
			expect(sessionStatusSubject.next).toHaveBeenCalledWith(authEvent);
	}));
	
	it('retrieves auth events observable', inject([AuthService], (authService: AuthService) => {
		const authEventsObservable = authService.sessionStatus();
		
		expect(authEventsObservable).toBeDefined();
	}));
	
});
