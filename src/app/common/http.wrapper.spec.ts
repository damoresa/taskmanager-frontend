import { TestBed, inject } from '@angular/core/testing';

import { Headers, Http, HttpModule, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { HttpWrapper } from './http.wrapper';
import { SessionStore } from './auth/session.store';

// We need to create a variable for the Jasmine context variable
declare const jasmine;

describe('HttpWrapper', () => {
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				HttpWrapper,
				SessionStore
			]
		});
		
		// Initialize the component data
	});
	
	it('creates an instance', inject([HttpWrapper],(httpWrapper: HttpWrapper) => {
		expect(httpWrapper).toBeDefined();
	}));
	
	it('attached authorization headers (with token & headers)', inject([HttpWrapper, SessionStore], 
		(httpWrapper: HttpWrapper, sessionStore: SessionStore) => {
			// Property spies are not supported on my current version of Jasmine, so this 
			// ugly workaround is in order: manually create a spy and attach it to the object
			const token = 'EXTOKEN';
			const getSpy = jasmine.createSpy().and.returnValue(token)
			Object.defineProperty(sessionStore, 'token', { get: getSpy });
			
			const headers = new Headers();
			headers.append('EX-HEADER', 'EXVALUE');
			const requestOptions: RequestOptions = new RequestOptions();
			requestOptions.headers = headers;
			httpWrapper.addAuthHeader(requestOptions);
			
			expect(getSpy).toHaveBeenCalled();
			expect(requestOptions.headers).toBeDefined();
			expect(requestOptions.headers.has('Authorization')).toBe(true);
			expect(requestOptions.headers.get('Authorization')).toBe(`bearer ${token}`);
	}));
	
	it('attached authorization headers (with token & without headers)', inject([HttpWrapper, SessionStore], 
		(httpWrapper: HttpWrapper, sessionStore: SessionStore) => {
			// Property spies are not supported on my current version of Jasmine, so this 
			// ugly workaround is in order: manually create a spy and attach it to the object
			const token = 'EXTOKEN';
			const getSpy = jasmine.createSpy().and.returnValue(token);
			Object.defineProperty(sessionStore, 'token', { get: getSpy });
			
			const requestOptions: RequestOptions = new RequestOptions();
			httpWrapper.addAuthHeader(requestOptions);
			
			// Token is displayed on a really weird way as if the `` weren't being processed
			console.log(requestOptions.headers.keys());
			expect(getSpy).toHaveBeenCalled();
			expect(requestOptions.headers).toBeDefined();
			expect(requestOptions.headers.has('Authorization')).toBe(true);
			expect(requestOptions.headers.get('Authorization')).toBe(`bearer ${token}`);
	}));
	
	it('attached authorization headers (without token & without headers)', inject([HttpWrapper, SessionStore], 
		(httpWrapper: HttpWrapper, sessionStore: SessionStore) => {
			// Property spies are not supported on my current version of Jasmine, so this 
			// ugly workaround is in order: manually create a spy and attach it to the object
			const token = undefined;
			const getSpy = jasmine.createSpy().and.returnValue(token);
			Object.defineProperty(sessionStore, 'token', { get: getSpy });
			
			const requestOptions: RequestOptions = new RequestOptions();
			httpWrapper.addAuthHeader(requestOptions);
			
			expect(getSpy).toHaveBeenCalled();
	}));
	
	describe('launches requests', () => {
		const endpoint = '/exampleEndpoint';
		const exampleData = { 'example': 'data' };
		const requestOptions = new RequestOptions();
		const token = 'EXTOKEN';
		
		let getSpy: any;
		
		beforeEach(inject([SessionStore], (sessionStore: SessionStore) => {
			// For all these tests mock the Authorization token
			// Property spies are not supported on my current version of Jasmine, so this 
			// ugly workaround is in order: manually create a spy and attach it to the object
			getSpy = jasmine.createSpy().and.returnValue(token);
			Object.defineProperty(sessionStore, 'token', { get: getSpy });
			
			// Add the Authorization header that will be added
			const headers = new Headers();
			headers.append('Authorization', `bearer ${token}`);
			requestOptions.headers = headers;
		}));
		
		it('executes get (without request opts)', inject([Http, HttpWrapper], 
			(http, httpWrapper: HttpWrapper) => {
				spyOn(http, 'get');
				
				httpWrapper.get(endpoint);
				
				expect(http.get).toHaveBeenCalled();
				expect(http.get).toHaveBeenCalledWith(endpoint, requestOptions);
		}));
		
		it('executes get (with request opts)', inject([Http, HttpWrapper], 
			(http, httpWrapper: HttpWrapper) => {
				spyOn(http, 'get');
				
				httpWrapper.get(endpoint, new RequestOptions());
				
				expect(http.get).toHaveBeenCalled();
				expect(http.get).toHaveBeenCalledWith(endpoint, requestOptions);
		}));
		
		it('executes post (without request opts & without data)', inject([Http, HttpWrapper], 
			(http, httpWrapper: HttpWrapper) => {
				spyOn(http, 'post');
				
				httpWrapper.post(endpoint);
				
				expect(http.post).toHaveBeenCalled();
				expect(http.post).toHaveBeenCalledWith(endpoint, undefined, requestOptions);
		}));
		
		it('executes post (without request opts & with data)', inject([Http, HttpWrapper], 
			(http, httpWrapper: HttpWrapper) => {
				spyOn(http, 'post');
				
				httpWrapper.post(endpoint, exampleData);
				
				expect(http.post).toHaveBeenCalled();
				expect(http.post).toHaveBeenCalledWith(endpoint, exampleData, requestOptions);
		}));
		
		it('executes post (with request opts & with data)', inject([Http, HttpWrapper], 
			(http, httpWrapper: HttpWrapper) => {
				spyOn(http, 'post');
				
				httpWrapper.post(endpoint, exampleData, new RequestOptions());
				
				expect(http.post).toHaveBeenCalled();
				expect(http.post).toHaveBeenCalledWith(endpoint, exampleData, requestOptions);
		}));
	});
	
});
