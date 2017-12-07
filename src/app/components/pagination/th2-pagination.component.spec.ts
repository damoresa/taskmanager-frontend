import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Th2PaginationComponent } from './th2-pagination.component';

describe('Th2PaginationComponent', () => {
	
	let component: Th2PaginationComponent;
	let fixture: ComponentFixture<Th2PaginationComponent>;
	
	beforeEach(() => {
		// Create the component to be tested
		TestBed.configureTestingModule({
			declarations: [ Th2PaginationComponent ],
		});
		
		fixture = TestBed.createComponent(Th2PaginationComponent);
		component = fixture.componentInstance;
		
		// Initialize the component data
		component.firstPageLabel = '<<';
		component.previousPageLabel = '<';
		component.goToLabel = 'Go';
		component.nextPageLabel = '>';
		component.lastPageLabel = '>>';
		component.currentPage = 1;
		component.noResults = 100;
		component.pageSize = 10;
		
		// Execute afterViewInit cause it's required by 
		// all the other functions
		component.ngAfterViewInit();
	});
	
	it('creates an instance', () => {
		expect(component).toBeDefined();
	});
	
	it('after view init', () => {
		//component.ngAfterViewInit();
		expect(component.noPages).toBe(10);
	});
	
	it('goes to first page', () => {
		spyOn(component.pageChanged, 'emit');
		component.currentPage = 2;
		component.firstPage();
		
		expect(component.pageChanged.emit).toHaveBeenCalled();
		expect(component.pageChanged.emit).toHaveBeenCalledWith(1);
	});
	
	it('goes to previous page', () => {
		spyOn(component.pageChanged, 'emit');
		component.currentPage = 2;
		component.previousPage();
		
		expect(component.pageChanged.emit).toHaveBeenCalled();
		expect(component.pageChanged.emit).toHaveBeenCalledWith(1);
	});
	
	it('goes to given page', () => {
		spyOn(component.pageChanged, 'emit');
		const noPage = 5;
		component.goToPage(noPage);
		
		expect(component.pageChanged.emit).toHaveBeenCalled();
		expect(component.pageChanged.emit).toHaveBeenCalledWith(noPage);
	});
	
	it('goes to next page', () => {
		spyOn(component.pageChanged, 'emit');
		component.nextPage();
		
		expect(component.pageChanged.emit).toHaveBeenCalled();
		expect(component.pageChanged.emit).toHaveBeenCalledWith(2);
	});
	
	it('goes to last page', () => {
		spyOn(component.pageChanged, 'emit');
		component.lastPage();
		
		expect(component.pageChanged.emit).toHaveBeenCalled();
		expect(component.pageChanged.emit).toHaveBeenCalledWith(10);
	});
});
