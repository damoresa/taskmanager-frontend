import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Th2ModalComponent } from './th2-modal.component';

describe('Th2ModalComponent', () => {
	
	let component: Th2ModalComponent;
	let fixture: ComponentFixture<Th2ModalComponent>;
	
	let modalId = 'exampleModal';
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			declarations: [ Th2ModalComponent ],
		});
		
		fixture = TestBed.createComponent(Th2ModalComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
		component.modalId = modalId;
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	/* TODO: Find a way to inject jQuery into the jasmine tests context
	it('shows the modal', () => {
		// spyOn($, 'modal');
		component.show();
		
		// expect($.fn.modal).toHaveBeenCalled();
		// expect($.fn.modal).toHaveBeenCalledWith('show');
	});
	
	it('dismisses the modal', () => {
		// spyOn($.fn, 'modal');
		component.dismiss();
		
		// expect($.fn.modal).toHaveBeenCalled();
		// expect($.fn.modal).toHaveBeenCalledWith('hide');
	});
	*/
	
});
