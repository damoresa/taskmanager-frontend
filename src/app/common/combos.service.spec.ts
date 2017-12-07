import { TestBed, inject } from '@angular/core/testing';

import { Headers, HttpModule, Response, ResponseOptions, ResponseOptionsArgs } from '@angular/http';

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
			const response: Response = new Response({
				'body': mockedProjectData,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(http, 'get').and.returnValue(Observable.of(response));
			combosService.getProjects().subscribe(
				(data) => {
					expect(data).toBe(mockedProjectData);
				},
				(error) => { console.error(` # ERROR # ${error} `); }
			);
	}));
	
	it('loads projects (no results)', inject([CombosService, HttpWrapper],
		(combosService: CombosService, http: HttpWrapper) => {
			const emptyProjectData = [];
			const response: Response = new Response({
				'body': emptyProjectData,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(http, 'get').and.returnValue(Observable.of(response));
			combosService.getProjects().subscribe(
				(data) => {
					expect(data).toBe(emptyProjectData);
				},
				(error) => { console.error(` # ERROR # ${error} `); }
			);
	}));
	
});
