import {GET_ADDONS, GET_PROJECTS} from './project-types';
import {IProjectState} from './index';
import {Types} from './constant-types';
import {Util} from '../../../shared/classes/Util';
import {IModel} from '../../../shared/interfaces/IModel';

export const getters = {

  /**
   * Get properties only for
   * project filter
   * @param {IProjectState} state
   * @returns {{}}
   */
  [GET_ADDONS](state: IProjectState) {
    return {
      [Types.PRODUCTION_LINE]: state.lines,
      [Types.PROGRAM]: state.programs,
      [Types.DOMAIN]: state.domains,
      [Types.PROJECT_TYPE]: state.types,
      [Types.CUSTOMER]: state.customers,
    };
  },

  [GET_PROJECTS](state: IProjectState) {
    let projects = state.projects;

    for (const  key in state.filter) {
      projects = projects.filter(project => {
        if(state.filter[key].length){
          if(Array.isArray(project[key])) {
            return project[key].map((item: IModel) => item.id).filter((id: string) =>
              state.filter[key].indexOf(id) > -1).length === state.filter[key].length;
          } else {
            const searchedId = key === Util.mapNameToProperty(Types.PRODUCTION_LINE )
                             ? project[Util.mapNameToProperty(Types.PROGRAM)].lineId
                             : project[key].id;

            return state.filter[key].indexOf(searchedId) > -1;
          }
        } else {
          return project;
        }
      })
    }

    return projects;
  }
}
