import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { Technology } from '../../../shared/models/technology';
import {Employee } from '../../../shared/models/employee';
import { ProjectService } from '../project.service';

import { FormGroup }                 from '@angular/forms';
import { QuestionBase }              from '../../../controls/form/question-base';
import { TextboxQuestion }              from '../../../controls/form/dynamic-question/question-textbox';
import { QuestionControlService }    from '../../../controls/form/question-control.service';



import {Message} from 'primeng/components/common/api';



@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  styleUrls:  [
      './project-form.component.less'],
  animations: []
})
export class ProjectFormComponent {

    @Input() model:Project=new Project();
    @Input() questions: QuestionBase<any>[] = [];
    form: FormGroup;
    
    //initial employee list
    initialEmployees:Array<Employee>=new Array<Employee>();
    //initial tech list
    initialTechnologies:Array<Technology>=new Array<Technology>();

    msgs: Message[] = [];
    dateValue:Date;

    private lines:Array<string>;
    private domains:Array<string>;
    
    constructor(private dataService:ProjectService, private qcs: QuestionControlService) {
        
    }

    ngOnInit(){

        this.dataService.getConstants().subscribe(res=>{
            this.lines=res.lines;
            this.domains=res.domains;

            
        },error=>{
            console.log(error);
        })

        this.questions=[new TextboxQuestion({
            key: 'firstName',
            label: 'First name',
            value: 'Bombasto',
            required: true,
            order: 1
          })]
        this.form = this.qcs.toFormGroup(this.questions);

        console.log(this.form.valid)
        
        
    }

    onSubmit(){
        console.log(this.form.value);
    }
    
    filterEmployees(event){
        this.model.employees=this.initialEmployees;
        console.log(this.model.employees,this.initialEmployees)
        this.model.employees=this.model.employees.filter(item=>
            item.fullname.toLowerCase().indexOf(event.toLowerCase())!=-1 || 
            item.roles[0].name.toLowerCase().indexOf(event.toLowerCase())!=-1
        );
      }

      filterTechnologies(event){
          
        this.model.technologies=this.initialTechnologies;
        this.model.technologies=this.model.technologies.filter(item=>item.name.toLowerCase().indexOf(event.toLowerCase())!=-1);
      }

      selectTechnology(event){
          let tech=this.initialTechnologies.filter(item=>item.name===event)[0];
          tech.active=!tech.active;
      }

      selectEmployee(event){
        let employee=this.initialEmployees.filter(item=>item.fullname===event.fullname)[0];
        employee.active=event.active;
      }


      createProject(){
        this.dataService.createProject(this.model);
      }

      setValue(value,prop){
          this.model[prop]=value;
          console.log(this.model)
      }


      changeLine(event){
          this.model.line=event;
      }

      back(){
          window.history.back();
      }

      stopAction($event){
          $event.stopPropagation();
      }

}