import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Thin2ComponentsModule } from './../../components/th2-components.module';

import { SessionStore } from './../../common/auth/session.store';
import { BaseuriInjectionToken } from './../../common/baseuri.injection.token';
import { HttpWrapper } from './../../common/http.wrapper';

import { ProjectsComponent } from './projects.component';
import { ProjectsService } from './projects.service';

describe('ProjectsComponent', () => {
	
	const mockProject = {
		'code': 'tproject',
		'name': 'Test project',
		'description': 'Just a test project'
	};
	const mockProjects = [mockProject];
	
	let component: ProjectsComponent;
	let fixture: ComponentFixture<ProjectsComponent>;
	
	beforeEach(async(() => {
		// Compile the components because of their external templates
		TestBed.configureTestingModule({
			imports: [
				CommonModule,
				HttpModule,
				ReactiveFormsModule,
				Thin2ComponentsModule
			],
			declarations: [ ProjectsComponent ],
			providers: [
				{
					provide: BaseuriInjectionToken,
					useValue: '/'
				},
				ProjectsService,
				HttpWrapper,
				SessionStore
			]
		});
	}));
	
	beforeEach(() => {
		// Create the component to be tested
		fixture = TestBed.createComponent(ProjectsComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
	it('creates a working form', () => {
		// Validate that the form is invalid at this point
		expect(component.projectForm.valid).toBeFalsy();
		expect(component.projectForm.controls['code'].errors['required']).toBeTruthy();
		expect(component.projectForm.controls['name'].errors['required']).toBeTruthy();
		expect(component.projectForm.controls['description'].errors['required']).toBeTruthy();
		
		// Fill the data and validate the form again
		component.projectForm.controls['code'].setValue('code');
		component.projectForm.controls['name'].setValue('name');
		component.projectForm.controls['description'].setValue('description');
		expect(component.projectForm.controls['code'].errors['minlength']).toBeTruthy();
		expect(component.projectForm.controls['name'].errors['minlength']).toBeTruthy();
		
		// Fill the correct data and try for the last time
		component.projectForm.controls['code'].setValue('vcode');
		component.projectForm.controls['name'].setValue('valid name');
		expect(component.projectForm.valid).toBeTruthy();
	});
	
	it('initializes', async(inject([ProjectsService], (projectsService: ProjectsService) => {
		spyOn(projectsService, 'getProjects').and.returnValue(Observable.of(mockProjects));
		
		component.ngOnInit();
		
		expect(projectsService.getProjects).toHaveBeenCalled();
		expect(component.projects).toBe(mockProjects);
	})));
	
	it('handles project load errors', async(inject([ProjectsService], (projectsService: ProjectsService) => {
		spyOn(projectsService, 'getProjects').and.returnValue(Observable.throw({ 'error': 'Critical failure' }));
		
		component.loadProjects();
		
		expect(projectsService.getProjects).toHaveBeenCalled();
	})));
	
	describe('creates projects', () => {
		
		beforeEach(async(inject([ProjectsService], (projectsService: ProjectsService) => {
			spyOn(projectsService, 'getProjects').and.returnValue(Observable.of(mockProjects));
			
			component.ngOnInit();
			fixture.detectChanges();
			
			expect(projectsService.getProjects).toHaveBeenCalled();
		})));
	
		it('creates projects (success)', async(inject([ProjectsService], (projectsService: ProjectsService) => {
			fixture.whenStable().then(() => {
				spyOn(projectsService, 'createProject').and.returnValue(Observable.of(mockProjects));
				const creationModal = component.modals.find((modal) => modal.modalId === 'createProjectModal');
				spyOn(creationModal, 'dismiss');
				
				component.createProject(mockProject);
				
				expect(projectsService.createProject).toHaveBeenCalled();
				expect(projectsService.createProject).toHaveBeenCalledWith(mockProject);
				expect(creationModal.dismiss).toHaveBeenCalled();
			});
		})));
		
		it('creates projects (failure)', async(inject([ProjectsService], (projectsService: ProjectsService) => {
			fixture.whenStable().then(() => {
				spyOn(projectsService, 'createProject').and.returnValue(Observable.throw({ 'error': 'Critical failure' }));
				
				component.createProject(mockProject);
				
				expect(projectsService.createProject).toHaveBeenCalled();
				expect(projectsService.createProject).toHaveBeenCalledWith(mockProject);
			});
		})));
	});
	
});
