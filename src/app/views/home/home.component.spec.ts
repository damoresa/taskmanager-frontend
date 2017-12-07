import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
	
	let component: HomeComponent;
	let fixture: ComponentFixture<HomeComponent>;
	
	beforeEach(async(() => {
		// Compile the components because of their external templates
		TestBed.configureTestingModule({
			declarations: [ HomeComponent ],
		});
	}));
	
	beforeEach(() => {
		// Create the component to be tested
		fixture = TestBed.createComponent(HomeComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
});
