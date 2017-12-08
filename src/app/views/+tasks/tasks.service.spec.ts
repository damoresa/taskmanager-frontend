import { inject, TestBed } from '@angular/core/testing';

import { Headers, HttpModule, RequestOptions, Response, ResponseOptions, ResponseOptionsArgs, URLSearchParams } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { SessionStore } from './../../common/auth/session.store';
import { BaseuriInjectionToken } from './../../common/baseuri.injection.token';
import { HttpWrapper } from './../../common/http.wrapper';

import { TasksService } from './tasks.service';

// We need to create a variable for the Jasmine context variable
declare const jasmine;

describe('TasksService', () => {
	
	const taskMock = {
		'id': '123',
		'code': '00001',
		'name': 'Example task',
		'description': 'Testing example task',
		'projectCode': 'EXPROJECT'
	};
	const mockedTaskData = [taskMock];
	const mockedSuccessResponse = {
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
				TasksService,
				HttpWrapper,
				SessionStore
			],
		});
		
		// Initialize the component data
	});
	
	it('creates an instance', inject([TasksService], (tasksService: TasksService) => {
		expect(tasksService).toBeDefined();
	}));
	
	it('retrieves tasks', inject([TasksService, HttpWrapper],
		(tasksService: TasksService, httpWrapper: HttpWrapper) => {
			const response: Response = new Response({
				'body': mockedTaskData,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'get').and.returnValue(Observable.of(response));
			
			tasksService.getTasks(taskMock.code, taskMock.projectCode).subscribe(
				(data) => {
					expect(data).toBe(mockedTaskData);
				},
				(error) => { console.error(' # ERROR # Unable to query tasks '); }
			);
			
			const searchParams: URLSearchParams = new URLSearchParams();
			searchParams.set('taskCode', taskMock.code);
			searchParams.set('projectCode', taskMock.projectCode);

			const requestOptions = new RequestOptions();
			requestOptions.params = searchParams;
			
			expect(httpWrapper.get).toHaveBeenCalled();
			expect(httpWrapper.get).toHaveBeenCalledWith(jasmine.any(String), requestOptions);
	}));
	
	it('retrieves task by code', inject([TasksService, HttpWrapper],
		(tasksService: TasksService, httpWrapper: HttpWrapper) => {
			const response: Response = new Response({
				'body': taskMock,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'get').and.returnValue(Observable.of(response));
			
			tasksService.getTask(taskMock.code).subscribe(
				(data) => {
					expect(data).toBe(taskMock);
				},
				(error) => { console.error(' # ERROR # Unable to query task by id '); }
			);
			
			expect(httpWrapper.get).toHaveBeenCalled();
			expect(httpWrapper.get).toHaveBeenCalledWith(jasmine.any(String));
	}));
	
	it('creates tasks', inject([TasksService, HttpWrapper],
		(tasksService: TasksService, httpWrapper: HttpWrapper) => {
			const response: Response = new Response({
				'body': mockedSuccessResponse,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'post').and.returnValue(Observable.of(response));
			
			tasksService.createTask(taskMock).subscribe(
				(data) => {
					expect(data).toBe(mockedSuccessResponse);
				},
				(error) => { console.error(' # ERROR # Unable to create task '); }
			);
			
			expect(httpWrapper.post).toHaveBeenCalled();
			expect(httpWrapper.post).toHaveBeenCalledWith(
				jasmine.any(String),
				taskMock,
				jasmine.any(RequestOptions)
			);
	}));
	
	it('logs work', inject([TasksService, HttpWrapper],
		(tasksService: TasksService, httpWrapper: HttpWrapper) => {
			const log = {
				'duration': 10,
				'description': 'Example log',
				'date': '01/01/1970'
			};
			const response: Response = new Response({
				'body': mockedSuccessResponse,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'post').and.returnValue(Observable.of(response));
			
			tasksService.logWork(taskMock.code, log).subscribe(
				(data) => {
					expect(data).toBe(mockedSuccessResponse);
				},
				(error) => { console.error(' # ERROR # Unable to log work '); }
			);
			
			expect(httpWrapper.post).toHaveBeenCalled();
			expect(httpWrapper.post).toHaveBeenCalledWith(
				jasmine.any(String),
				log,
				jasmine.any(RequestOptions)
			);
	}));
	
	it('closes task', inject([TasksService, HttpWrapper],
		(tasksService: TasksService, httpWrapper: HttpWrapper) => {
			const response: Response = new Response({
				'body': mockedSuccessResponse,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'post').and.returnValue(Observable.of(response));
			
			tasksService.closeTask(taskMock.code).subscribe(
				(data) => {
					expect(data).toBe(mockedSuccessResponse);
				},
				(error) => { console.error(' # ERROR # Unable to log work '); }
			);
			
			expect(httpWrapper.post).toHaveBeenCalled();
			expect(httpWrapper.post).toHaveBeenCalledWith(
				jasmine.any(String),
				{},
				jasmine.any(RequestOptions)
			);
	}));
	
	it('links tasks', inject([TasksService, HttpWrapper],
		(tasksService: TasksService, httpWrapper: HttpWrapper) => {
			const linkedTaskCode = '0002';
			const response: Response = new Response({
				'body': mockedSuccessResponse,
				'headers': new Headers(),
				'merge': (options?: ResponseOptionsArgs) => { return new ResponseOptions() },
				'status': 200,
				'url': 'testEndpoint',
			});
			spyOn(httpWrapper, 'post').and.returnValue(Observable.of(response));
			
			tasksService.linkTasks(taskMock.code, linkedTaskCode).subscribe(
				(data) => {
					expect(data).toBe(mockedSuccessResponse);
				},
				(error) => { console.error(' # ERROR # Unable to log work '); }
			);
			
			expect(httpWrapper.post).toHaveBeenCalled();
			expect(httpWrapper.post).toHaveBeenCalledWith(
				jasmine.any(String),
				linkedTaskCode,
				jasmine.any(RequestOptions)
			);
	}));
	
});
