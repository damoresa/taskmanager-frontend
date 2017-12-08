import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { Thin2ComponentsModule } from './../../components/th2-components.module';

import { SessionStore } from './../../common/auth/session.store';
import { BaseuriInjectionToken } from './../../common/baseuri.injection.token';
import { HttpWrapper } from './../../common/http.wrapper';

import { TaskDetailComponent } from './task.detail.component';
import { TasksService } from './tasks.service';

describe('TaskDetailComponent', () => {
	
	let component: TaskDetailComponent;
	let fixture: ComponentFixture<TaskDetailComponent>;
	
	const routes = [{ path: '', component: TaskDetailComponent }];
	
	let taskMock;
	let taskResponse;
	let mockedSuccessResponse;
	
	beforeEach(async(() => {
		// Compile the components because of their external templates
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				HttpModule,
				RouterTestingModule.withRoutes(routes),
				Thin2ComponentsModule
			],
			declarations: [ TaskDetailComponent ],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				HttpWrapper,
				SessionStore,
				TasksService
			]
		});
	}));
	
	beforeEach(() => {
		// Create the component to be tested
		fixture = TestBed.createComponent(TaskDetailComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
		taskMock = {
			'code': '00001',
			'name': 'Example task',
			'description': 'Testing example task',
			'duration': 360,
			'linkedTasks': ['00002'],
			'progress': 100,
			'open': false,
			'projectCode': 'EXPROJECT'
		};
		taskResponse = {
			'task': taskMock
		};
		mockedSuccessResponse = {
			code: 'TM-EXAMPLE-0001',
			message: 'Works properly'
		};
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
	it('initializes', async(inject([ActivatedRoute, TasksService],
		(activatedRoute: ActivatedRoute, tasksService: TasksService) => {
			activatedRoute.params = Observable.of({ 'taskId': taskMock.code });
			spyOn(tasksService, 'getTask').and.returnValue(Observable.of(taskResponse));
			
			component.ngOnInit();
			
			expect(tasksService.getTask).toHaveBeenCalled();
			expect(tasksService.getTask).toHaveBeenCalledWith(taskMock.code);
			expect(component.task).toBe(taskMock);
	})));
	
	it('loads task (error)', async(inject([ActivatedRoute, TasksService],
		(activatedRoute: ActivatedRoute, tasksService: TasksService) => {
			activatedRoute.params = Observable.of({ 'taskId': taskMock.code });
			spyOn(tasksService, 'getTask').and.returnValue(Observable.throw({ 'error': 'Critical error' }));
			
			component.ngOnInit();
			
			expect(tasksService.getTask).toHaveBeenCalled();
			expect(tasksService.getTask).toHaveBeenCalledWith(taskMock.code);
	})));
	
	it('destroys well', async(inject([ActivatedRoute, TasksService],
		(activatedRoute: ActivatedRoute, tasksService: TasksService) => {
			activatedRoute.params = Observable.of({ 'taskId': taskMock.code });
			spyOn(tasksService, 'getTask').and.returnValue(Observable.of(taskResponse));
			
			component.ngOnInit();
			fixture.detectChanges();
			
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				component.ngOnDestroy();
				
				expect(tasksService.getTask).toHaveBeenCalled();
				expect(tasksService.getTask).toHaveBeenCalledWith(taskMock.code);
				expect(component.task).toBe(taskMock);
			});
	})));
	
	describe('closes tasks', () => {
		
		beforeEach(async(inject([ActivatedRoute, TasksService],
			(activatedRoute: ActivatedRoute, tasksService: TasksService) => {
				activatedRoute.params = Observable.of({ 'taskId': taskMock.code });
				spyOn(tasksService, 'getTask').and.returnValue(Observable.of(taskResponse));
				
				component.ngOnInit();
				fixture.detectChanges();
			
				expect(tasksService.getTask).toHaveBeenCalled();
				expect(tasksService.getTask).toHaveBeenCalledWith(taskMock.code);
				expect(component.task).toBe(taskMock);
		})));

		it('closes task (success)', async(inject([TasksService], (tasksService: TasksService) => {
				spyOn(tasksService, 'closeTask').and.returnValue(Observable.of(mockedSuccessResponse));
				
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					component.closeTask();
					
					expect(tasksService.getTask).toHaveBeenCalled();
					expect(tasksService.getTask).toHaveBeenCalledWith(taskMock.code);
					expect(tasksService.closeTask).toHaveBeenCalled();
					expect(tasksService.closeTask).toHaveBeenCalledWith(taskMock.code);
				});
		})));
		
		it('closes task (failure)', async(inject([TasksService], (tasksService: TasksService) => {
				spyOn(tasksService, 'closeTask').and.returnValue(Observable.throw({ 'error': 'Critical error' }));
				
				fixture.whenStable().then(() => {
					fixture.detectChanges();
					component.closeTask();
					
					expect(tasksService.closeTask).toHaveBeenCalled();
					expect(tasksService.closeTask).toHaveBeenCalledWith(taskMock.code);
				});
		})));
	});
	
});
