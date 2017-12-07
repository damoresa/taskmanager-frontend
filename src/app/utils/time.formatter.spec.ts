import { TestBed } from '@angular/core/testing';

import { stringToMinutes, minutesToString } from './time.formatter';

describe('TimeFormatting Utils', () => {
	
	beforeEach(() => {
		// This should be a really simple test for the util functions
		// No components or services required, since they're self contained.
		TestBed.configureTestingModule({});
	});
	
	it('creates an instance', () => {
		expect(stringToMinutes).toBeDefined();
		expect(minutesToString).toBeDefined();
	});
	
	it('formats string to minutes', () => {
		const stringValue = '1d 1h 1m';
		const output = stringToMinutes(stringValue);
		
		expect(output).toBe('541');
	});
	
	it('formats minutes to string', () => {
		const minutesValue = 541;
		const output = minutesToString(minutesValue);
		
		expect(output).toBe('1d 1h 1m');
	});
});
