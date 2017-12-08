import { inject, TestBed } from '@angular/core/testing';

import { Headers, HttpModule, Response, ResponseOptions, ResponseOptionsArgs } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { SessionStore } from './../../common/auth/session.store';
import { BaseuriInjectionToken } from './../../common/baseuri.injection.token';
import { HttpWrapper } from './../../common/http.wrapper';

import { ProjectsService } from './projects.service';

describe('ProjectsService', () => {
	
	const projectMock = {
		'id': '123',
		'name': 'Example project',
		'description': 'Testing example project'
	};
	const mockedProjectData = [projectMock];
	const mockedCreationResponse = {
		code: 'TM-EXAMPLE-0001',
		message: 'Works properly'
	};
	
	beforeEach(() => {
		// Create the component to be tested
		// Compile the components because of their external templates
		TestBed.configureTestingModule({
			imports: [
				HttpModule
			],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				ProjectsService,
				HttpWrapper,
				SessionStore
			],
		});
		
		// Initialize the component data
	});
	
	it('creates an instance', inject([ProjectsService], (projectsService: ProjectsService) => {
		expect(projectsService).toBeDefined();
	}));
	
	it('retrieves projects', inject([ProjectsService, HttpWrapper],
		(projectsService: ProjectsService, httpWrapper: HttpWrapper) => {
			const response: Response = new Response({
				'body': mockedProjectData,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'get').and.returnValue(Observable.of(response));
			
			projectsService.getProjects().subscribe(
				(data) => {
					expect(data).toBe(mockedProjectData);
				},
				(error) => { console.error(' # ERROR # Unable to query projects '); }
			);
			
			expect(httpWrapper.get).toHaveBeenCalled();
	}));
	
	it('create project', inject([ProjectsService, HttpWrapper],
		(projectsService: ProjectsService, httpWrapper: HttpWrapper) => {
			const response: Response = new Response({
				'body': mockedCreationResponse,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'post').and.returnValue(Observable.of(response));
			
			projectsService.createProject(projectMock).subscribe(
				(data) => {
					expect(data).toBe(mockedCreationResponse);
				},
				(error) => { console.error(' # ERROR # Unable to query projects '); }
			);
			
			expect(httpWrapper.post).toHaveBeenCalled();
	}));
	
});
