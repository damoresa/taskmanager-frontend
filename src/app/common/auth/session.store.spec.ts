import { inject, TestBed } from '@angular/core/testing';

import { SessionStore } from './session.store';

describe('SessionStore', () => {
	
	const token = 'EXTOKEN';
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			providers: [
				SessionStore
			]
		});
		
		// Initialize the component data
	});
	
	it('creates an instance', inject([SessionStore],(sessionStore: SessionStore) => {
		expect(sessionStore).toBeDefined();
	}));
	
	it('store a token', inject([SessionStore],(sessionStore: SessionStore) => {
		spyOn(localStorage, 'setItem');
		
		sessionStore.token = token;
		
		expect(localStorage.setItem).toHaveBeenCalled();
		expect(localStorage.setItem).toHaveBeenCalledWith('AUTH_TOKEN', token);
	}));
	
	it('retrieve a token', inject([SessionStore],(sessionStore: SessionStore) => {
		spyOn(localStorage, 'getItem').and.returnValue(token);
		
		const readToken = sessionStore.token;
		
		expect(readToken).toBe(token);
	
		expect(localStorage.getItem).toHaveBeenCalled();
		expect(localStorage.getItem).toHaveBeenCalledWith('AUTH_TOKEN');
	}));
	
	it('clear a token', inject([SessionStore],(sessionStore: SessionStore) => {
		spyOn(localStorage, 'removeItem').and.returnValue(token);
		
		sessionStore.clearToken();
	
		expect(localStorage.removeItem).toHaveBeenCalled();
		expect(localStorage.removeItem).toHaveBeenCalledWith('AUTH_TOKEN');
	}));
	
});
