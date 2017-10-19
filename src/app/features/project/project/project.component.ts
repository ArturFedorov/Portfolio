import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { Technology } from '../../../shared/models/technology';
import { ProjectService } from '../project.service';
import { PROJECT_ANIMATION } from './project.animation';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'project',
  templateUrl: './project.component.html',
  styleUrls:  [
      './project.component.less'],
  animations: [PROJECT_ANIMATION]
})
export class ProjectComponent {

    @Input() model:Project=new Project();
    
    id:number;
    backend:Array<Technology>=new Array<Technology>();
    frontend:Array<Technology>=new Array<Technology>();
    information:Array<string>=new Array<string>();
    
    constructor(private dataService:ProjectService,private route: ActivatedRoute) {
        
    }

    ngOnInit(){
        this.route.params.subscribe(params=>{
            this.id=+params['id'];
            console.log(this.id);
        })


        this.model=this.dataService.generateProject();
        
        this.backend=this.model.technologies.filter(tech=>tech.domain==='backend');
        this.frontend=this.model.technologies.filter(tech=>tech.domain==='frontend');
        this.information.push("PSS 4.71");
        this.information.push("TOP 50");
    }
    
    ngAfterViewInit(){
        setTimeout(()=> {
            //this.model.description=this.trimText(this.model.description,101);
        }, 0);
        //
    }

}