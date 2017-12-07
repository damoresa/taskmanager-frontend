import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Th2ToastComponent } from './th2-toast.component';

describe('Th2ToastComponent', () => {
	
	let component: Th2ToastComponent;
	let fixture: ComponentFixture<Th2ToastComponent>;
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			declarations: [ Th2ToastComponent ],
		});
		
		fixture = TestBed.createComponent(Th2ToastComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
		component.message = 'Example toast';
		component.type = 'success';
		component.display = true;
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
	it('validates success type', () => {
		expect(component.isSuccess()).toBe(true);
		
		component.type = 'warning';
		expect(component.isSuccess()).toBe(false);
	});
	
	it('validates warning type', () => {
		expect(component.isWarning()).toBe(false);
		
		component.type = 'warning';
		expect(component.isWarning()).toBe(true);
	});
	
	it('validates error type', () => {
		expect(component.isError()).toBe(false);
		
		component.type = 'error';
		expect(component.isError()).toBe(true);
	});
	
	it('closes the toast', () => {
		spyOn(component.closeEvent, 'emit');
		component.close();
		
		expect(component.closeEvent.emit).toHaveBeenCalled();
	});
	
});
