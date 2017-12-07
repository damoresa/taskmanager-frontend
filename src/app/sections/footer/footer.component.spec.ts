import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
	
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;
	
	beforeEach(async(() => {
		// Compile the components because of their external templates
		TestBed.configureTestingModule({
			declarations: [ FooterComponent ],
		})
		.compileComponents();
	}));
	
	beforeEach(() => {
		// Create the component to be tested
		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
});
