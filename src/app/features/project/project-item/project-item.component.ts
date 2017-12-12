import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';


@Component({
  selector: 'project-item',
  templateUrl: './project-item.component.html',
  styleUrls:  [
      './project-item.component.less']
})
export class ProjectItemComponent {

    @Input() model:Project=new Project();
    description:string='';
    
    ribbonVisible=false;
    constructor() {
        
    }
    
    ngAfterViewInit(){
        setTimeout(()=> {
            this.description=this.trimText(this.model.description,101);
            if(this.model.enddate){
                this.ribbonVisible=new Date(this.model.enddate)<=new Date();
            }
        }, 0);
        //
    }

    trimText(string, limit)
        {
            return string.length > limit ? string.substring(0,limit) + "..." : string;
        }

}