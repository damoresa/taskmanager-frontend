import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';

import { minutesToString } from './../../utils/time.formatter';

import { TasksService } from './tasks.service';

@Component({
	selector: 'task-detail-component',
	templateUrl: './task.detail.component.html'
})
export class TaskDetailComponent implements OnDestroy, OnInit {

    progressPercentage: number;
    durationDisplay: string;
    progressDisplay: string;
	task = {
		code: '',
		name: '',
		description: '',
		duration: 0,
		progress: 0,
		open: false,
		linkedTasks: []
	};

	private taskId: string;
	private subscription: Subscription;
	
	constructor(
	    private route: ActivatedRoute,
        private tasksService: TasksService) {
		
	}
	
	ngOnInit() {
		// Retrieve taskId from path
		this.subscription = this.route.params.subscribe((params) => {
			this.taskId = params['taskId'];
            this.loadTask();
		});
	}

	ngOnDestroy() {
		// Clear the subscription when leaving the page
		if (this.subscription) {
			this.subscription.unsubscribe();
		}
	}

	loadTask() {
        this.tasksService.getTask(this.taskId).subscribe(
            (taskResponse) => {
                this.task = taskResponse.task;

                this.progressPercentage = (this.task.progress / this.task.duration) * 100;
                this.durationDisplay = minutesToString(this.task.duration);
                this.progressDisplay = minutesToString(this.task.progress);
            },
            (error) => {
                console.error(' Error while retrieve task detail ' + JSON.stringify(error));
            }
        );
	}

	closeTask() {
		this.tasksService.closeTask(this.task.code).subscribe(
			(response) => {
				// TODO: Success toast
                this.loadTask();
			},
			(error) => {
				console.log(` Error: ${JSON.stringify(error)} `);
			}
		);
	}
}
