import { TestBed, inject } from '@angular/core/testing';

import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { BaseuriInjectionToken } from './baseuri.injection.token';
import { HttpWrapper } from './http.wrapper';
import { SessionStore } from './auth/session.store';

import { CombosService } from './combos.service';

describe('CombosService', () => {
	
	const mockedProjectData = [
		{
			'id': '123',
			'name': 'Example project',
			'description': 'Testing example project'
		}
	];
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			imports: [ HttpModule ],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				CombosService,
				HttpWrapper,
				SessionStore
			]
		});
		
		// Initialize the component data
	});
	
	it('creates an instance', inject([CombosService],(combosService: CombosService) => {
		expect(combosService).toBeDefined();
	}));
	
	it('loads projects (results)', inject([CombosService, HttpWrapper],
		(combosService: CombosService, http: HttpWrapper) => {
			spyOn(http, 'get').and.returnValue(Observable.of(mockedProjectData));
			combosService.getProjects().subscribe(
				(data) => {
					expect(data).toBe(mockedProjectData);
				},
				(error) => { console.error(` # ERROR # ${error} `); }
			);
	}));
	
	it('loads projects (no results)', inject([CombosService, HttpWrapper],
		(combosService: CombosService, http: HttpWrapper) => {
			spyOn(http, 'get').and.returnValue(Observable.of([]));
			combosService.getProjects().subscribe(
				(data) => {
					expect(data).toBe([]);
				},
				(error) => { console.error(` # ERROR # ${error} `); }
			);
	}));
	
});
