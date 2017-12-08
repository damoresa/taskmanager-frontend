import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Thin2ComponentsModule } from './../../components/th2-components.module';

import { SessionStore } from './../../common/auth/session.store';
import { BaseuriInjectionToken } from './../../common/baseuri.injection.token';
import { CombosService } from './../../common/combos.service';
import { HttpWrapper } from './../../common/http.wrapper';

import { TasksComponent } from './tasks.component';
import { TasksService } from './tasks.service';

describe('TasksComponent', () => {
	
	let component: TasksComponent;
	let fixture: ComponentFixture<TasksComponent>;
	
	const routes = [{ path: '', component: TasksComponent }];
	
	let projectMock;
	let projectsMock;
	let taskMock;
	let tasksMock;
	let mockedSuccessResponse;
	
	beforeEach(async(() => {
		// Compile the components because of their external templates
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				HttpModule,
				ReactiveFormsModule,
				RouterTestingModule.withRoutes(routes),
				Thin2ComponentsModule
			],
			declarations: [ TasksComponent ],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				CombosService,
				HttpWrapper,
				SessionStore,
				TasksService
			]
		});
	}));
	
	beforeEach(() => {
		// Create the component to be tested
		fixture = TestBed.createComponent(TasksComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
		projectMock = {
			'code': 'EXPROJECT',
			'description': 'Example project'
		};
		projectsMock = [projectMock];
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
		tasksMock = [taskMock];
		mockedSuccessResponse = {
			code: 'TM-EXAMPLE-0001',
			message: 'Works properly'
		};
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
	it('creates a working filter form', () => {
		// The filter form is always valid
		expect(component.filterForm.valid).toBeTruthy();
	});
	
	it('creates a working task creation form', () => {
		// Validate that the form is invalid at this point
		expect(component.taskForm.valid).toBeFalsy();
		expect(component.taskForm.controls['name'].errors['required']).toBeTruthy();
		expect(component.taskForm.controls['duration'].errors['required']).toBeTruthy();
		expect(component.taskForm.controls['description'].errors['required']).toBeTruthy();
		expect(component.taskForm.controls['projectCode'].errors['required']).toBeTruthy();
		
		// Fill the data and validate the form again
		component.taskForm.controls['name'].setValue('name');
		component.taskForm.controls['duration'].setValue('100');
		component.taskForm.controls['description'].setValue('desc');
		component.taskForm.controls['projectCode'].setValue('EXPROJECT');
		expect(component.taskForm.valid).toBeFalsy();
		expect(component.taskForm.controls['name'].errors['minlength']).toBeTruthy();
		expect(component.taskForm.controls['duration'].errors['pattern']).toBeTruthy();
		expect(component.taskForm.controls['description'].errors['minlength']).toBeTruthy();
		
		// Fill the correct data and try for the last time
		component.taskForm.controls['name'].setValue('vname');
		component.taskForm.controls['duration'].setValue('1d');
		component.taskForm.controls['description'].setValue('valid description');
		expect(component.taskForm.valid).toBeTruthy();
	});
	
	it('creates a working time log form', () => {
		// Validate that the form is invalid at this point
		expect(component.timeForm.valid).toBeFalsy();
		// Clear the date default value
		component.timeForm.controls['date'].setValue(undefined);
		expect(component.timeForm.controls['time'].errors['required']).toBeTruthy();
		expect(component.timeForm.controls['date'].errors['required']).toBeTruthy();
		expect(component.timeForm.controls['detail'].errors['required']).toBeTruthy();
		
		// Fill the data and validate the form again
		component.timeForm.controls['time'].setValue('100');
		component.timeForm.controls['date'].setValue('01/01/1970');
		component.timeForm.controls['detail'].setValue('detail');
		expect(component.timeForm.valid).toBeFalsy();
		expect(component.timeForm.controls['time'].errors['pattern']).toBeTruthy();
		
		// Fill the correct data and try for the last time
		component.timeForm.controls['time'].setValue('1d');
		expect(component.timeForm.valid).toBeTruthy();
	});
	
	it('creates a task link form', () => {
		// Validate that the form is invalid at this point
		expect(component.linkForm.valid).toBeFalsy();
		expect(component.linkForm.controls['code'].errors['required']).toBeTruthy();
		
		// Fill the correct data and try for the last time
		component.linkForm.controls['code'].setValue('00002');
		expect(component.linkForm.valid).toBeTruthy();
	});
	
	it('initializes', async(inject([CombosService, TasksService],
		(combosService: CombosService, tasksService: TasksService) => {
			spyOn(combosService, 'getProjects').and.returnValue(Observable.of(projectsMock));
			spyOn(tasksService, 'getTasks').and.returnValue(Observable.of(tasksMock));
			
			component.ngOnInit();
			fixture.detectChanges();
			
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				expect(combosService.getProjects).toHaveBeenCalled();
				expect(tasksService.getTasks).toHaveBeenCalled();
				expect(component.projects[1].code).toBe(projectsMock[0].code);
				expect(component.projects[1].description).toBe(projectsMock[0].description);
				expect(component.tasks).toBe(tasksMock);
			});
	})));
	
	it('loads projects (error)', async(inject([CombosService], (combosService: CombosService) => {
		spyOn(combosService, 'getProjects').and.returnValue(Observable.throw({ 'error': 'Critical error' }));
		
		component.loadProjects();
		
		expect(combosService.getProjects).toHaveBeenCalled();
	})));
	
	it('loads tasks (error)', async(inject([TasksService], (tasksService: TasksService) => {
		spyOn(tasksService, 'getTasks').and.returnValue(Observable.throw({ 'error': 'Critical error' }));
		
		component.filter({});
		
		expect(tasksService.getTasks).toHaveBeenCalled();
	})));
	
	it('resets filter form', async(inject([TasksService], (tasksService: TasksService) => {
		spyOn(tasksService, 'getTasks').and.returnValue(Observable.of(tasksMock));
		
		component.resetFilter();
		
		expect(tasksService.getTasks).toHaveBeenCalled();
	})));
	
	describe('performs actions', () => {
		
		beforeEach(async(inject([CombosService, TasksService],
			(combosService: CombosService, tasksService: TasksService) => {
				spyOn(combosService, 'getProjects').and.returnValue(Observable.of(projectsMock));
				spyOn(tasksService, 'getTasks').and.returnValue(Observable.of(tasksMock));
				
				component.ngOnInit();
				fixture.detectChanges();
				
				expect(combosService.getProjects).toHaveBeenCalled();
				expect(tasksService.getTasks).toHaveBeenCalled();
		})));
		
		it('creates a task (success)', inject([TasksService], (tasksService: TasksService) => {
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				spyOn(tasksService, 'createTask').and.returnValue(Observable.of(mockedSuccessResponse));
				const creationModal = component.modals.find((modal) => modal.modalId === 'createTaskModal');
				spyOn(creationModal, 'dismiss');
				
				component.taskForm.controls['name'].setValue('Example name');
				component.taskForm.controls['description'].setValue('Example description');
				component.taskForm.controls['duration'].setValue('1d');
				component.taskForm.controls['projectCode'].setValue('EXPROJECT');
				const taskForm = component.taskForm.value;
				component.createTask(taskForm);
				
				expect(tasksService.createTask).toHaveBeenCalled();
				expect(tasksService.createTask).toHaveBeenCalledWith(taskForm);
				expect(creationModal.dismiss).toHaveBeenCalled();
			});
		}));
		
		it('creates a task (error)', inject([TasksService], (tasksService: TasksService) => {
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				spyOn(tasksService, 'createTask').and.returnValue(Observable.throw({ 'error': 'Critical error' }));
				
				component.taskForm.controls['name'].setValue('Example name');
				component.taskForm.controls['description'].setValue('Example description');
				component.taskForm.controls['duration'].setValue('1d');
				component.taskForm.controls['projectCode'].setValue('EXPROJECT');
				const taskForm = component.taskForm.value;
				component.createTask(taskForm);
				
				expect(tasksService.createTask).toHaveBeenCalled();
				expect(tasksService.createTask).toHaveBeenCalledWith(taskForm);
			});
		}));
		
		it('closes a task (success)', inject([TasksService], (tasksService: TasksService) => {
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				spyOn(tasksService, 'closeTask').and.returnValue(Observable.of(mockedSuccessResponse));
				
				const taskCode = '00001';
				component.selectTask(taskCode);
				component.closeTask();
				
				expect(tasksService.closeTask).toHaveBeenCalled();
				expect(tasksService.closeTask).toHaveBeenCalledWith(taskCode);
			});
		}));
		
		it('closes a task (error)', inject([TasksService], (tasksService: TasksService) => {
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				spyOn(tasksService, 'closeTask').and.returnValue(Observable.throw({ 'error': 'Critical error' }));
				
				const taskCode = '00001';
				component.selectTask(taskCode);
				component.closeTask();
				
				expect(tasksService.closeTask).toHaveBeenCalled();
				expect(tasksService.closeTask).toHaveBeenCalledWith(taskCode);
			});
		}));
		
		it('logs work for a task (success)', inject([TasksService], (tasksService: TasksService) => {
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				spyOn(tasksService, 'logWork').and.returnValue(Observable.of(mockedSuccessResponse));
				const creationModal = component.modals.find((modal) => modal.modalId === 'logWorkModal');
				spyOn(creationModal, 'dismiss');
				
				component.timeForm.controls['date'].setValue('01/01/1970');
				component.timeForm.controls['detail'].setValue('Example description');
				component.timeForm.controls['time'].setValue('1d');
				const loggedWork = component.timeForm.value;
				const taskCode = '00001';
				component.selectTask(taskCode);
				component.logWork(loggedWork);
				
				expect(tasksService.logWork).toHaveBeenCalled();
				expect(tasksService.logWork).toHaveBeenCalledWith(taskCode, loggedWork);
				expect(creationModal.dismiss).toHaveBeenCalled();
			});
		}));
		
		it('logs work for a task (error)', inject([TasksService], (tasksService: TasksService) => {
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				spyOn(tasksService, 'logWork').and.returnValue(Observable.throw({ 'error': 'Critical error' }));
				
				component.timeForm.controls['date'].setValue('01/01/1970');
				component.timeForm.controls['detail'].setValue('Example description');
				component.timeForm.controls['time'].setValue('1d');
				const loggedWork = component.timeForm.value;
				const taskCode = '00001';
				component.selectTask(taskCode);
				component.logWork(loggedWork);
				
				expect(tasksService.logWork).toHaveBeenCalled();
				expect(tasksService.logWork).toHaveBeenCalledWith(taskCode, loggedWork);
			});
		}));
		
		it('links a task (success)', inject([TasksService], (tasksService: TasksService) => {
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				spyOn(tasksService, 'linkTasks').and.returnValue(Observable.of(mockedSuccessResponse));
				const creationModal = component.modals.find((modal) => modal.modalId === 'linkTaskModal');
				spyOn(creationModal, 'dismiss');
				
				component.linkForm.controls['code'].setValue('00002');
				const linkedTask = component.linkForm.value;
				const taskCode = '00001';
				component.selectTask(taskCode);
				component.link(linkedTask);
				
				expect(tasksService.linkTasks).toHaveBeenCalled();
				expect(tasksService.linkTasks).toHaveBeenCalledWith(taskCode, linkedTask);
				expect(creationModal.dismiss).toHaveBeenCalled();
			});
		}));
		
		it('links a task (error)', inject([TasksService], (tasksService: TasksService) => {
			fixture.whenStable().then(() => {
				fixture.detectChanges();
				spyOn(tasksService, 'linkTasks').and.returnValue(Observable.throw({ 'error': 'Critical error' }));
				
				component.linkForm.controls['code'].setValue('00002');
				const linkedTask = component.linkForm.value;
				const taskCode = '00001';
				component.selectTask(taskCode);
				component.link(linkedTask);
				
				expect(tasksService.linkTasks).toHaveBeenCalled();
				expect(tasksService.linkTasks).toHaveBeenCalledWith(taskCode, linkedTask);
			});
		}));
		
	});
	
});
