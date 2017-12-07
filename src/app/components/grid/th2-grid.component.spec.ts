import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Th2GridAction } from './th2-grid-action';
import { Th2GridCallback } from './th2-grid-callback';
import { Th2GridColumn } from './th2-grid-column';
import { Th2GridComponent } from './th2-grid.component';

describe('Th2GridComponent', () => {
	
	let component: Th2GridComponent;
	let fixture: ComponentFixture<Th2GridComponent>;
	
	let action: Th2GridAction;
	let column: Th2GridColumn;
	let data: any = [
		{
			'id': 'exampleId',
			'description': 'exampleDescription'
		}
	];
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			declarations: [ Th2GridComponent ],
		});
		
		fixture = TestBed.createComponent(Th2GridComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
		action = new Th2GridAction(
			'action',
			'Action',
			''
		);
		column = new Th2GridColumn(
			'Description',
			'description',
			'description',
			'',
			[action]
		);
		
		const columns = [column];
		component.columns = columns;
		component.data = data;
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
	it('triggers on click', () => {
		spyOn(component.actionClicked, 'emit');
		component.elementClicked(action.actionId, data[0]);
		const callbackBody: Th2GridCallback = new Th2GridCallback(action.actionId, data[0]);
		
		expect(component.actionClicked.emit).toHaveBeenCalled();
		expect(component.actionClicked.emit).toHaveBeenCalledWith(callbackBody);
	});
	
});
