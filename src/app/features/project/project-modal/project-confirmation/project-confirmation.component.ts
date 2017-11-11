import { Component, Input } from '@angular/core';
import { ModalComponent } from '../../../../shared/modal/modal.component';
import { Project } from '../../../../shared/models/project';
import { Schedule } from '../../../../shared/models/schedule';
import { Employee } from '../../../../shared/models/employee';

@Component({
  selector: 'project-confirmation',
  templateUrl: './project-confirmation.component.html',
  styleUrls:  ['./project-confirmation.component.less']
})
export class ProjectConfirmationComponent extends ModalComponent {

    @Input() project:Project=new Project();



    constructor() {
        super();
    }

    ngOnInit(){
        
    }


}