import { Component, Input } from '@angular/core';
import { Project } from '../../../shared/models/project';
import { ProjectService } from '../project.service';
import { LIST_ANIMATION } from './project-list.animation';


@Component({
  selector: 'project-list',
  templateUrl: './project-list.component.html',
  styleUrls:  [
      './project-list.component.less'],
  animations:LIST_ANIMATION
})

export class ProjectListComponent {

    @Input() projects:Array<Project>=new Array<Project>();
    @Input() sortOrder:boolean=true;

    tooltipVisible:boolean=false;

    constructor(private dataService:ProjectService) {
        this.projects=this.dataService.generateProjects();
    }

    onFilterAction(event){
        // switch(event){
        //     case 'sort':
        //     let sorted$ = this.projects.sort(this.sortByName);
        //     break;
        // }
        // for(let pr of this.projects){
        //     console.log(Object.keys(pr));
        // }
        this.projects.sort(this.propComparator(event));
        this.tooltipVisible=false;
        console.log(this.tooltipVisible)
    }

    propComparator(prop) {
        return function(a, b) {
            //console.log(a[prop],b[prop],prop,a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1)
            return a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1;
        }
    }

    sortByName(a,b) {
       
        if (a.name < b.name)
          return -1;
        if (a.name > b.name)
          return 1;
        return 0;

        
      }

      hello(){
          console.log('hello')
      }
}