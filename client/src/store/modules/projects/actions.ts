import {ActionTree} from 'vuex';
import {ProjectService} from './project.service';
import {IProjectState} from './index';
import {FETCH_ADDONS, FETCH_PROJECTS, GENERATE_PRESENTATION} from './action-types';
import {
  FINISH_LOADING, SET_CUSTOMERS, SET_DOMAINS, SET_LINES, SET_PROGRAMS, SET_PROJECTS,
  SET_TYPES
} from './mutation-types';
import {PowerPointService} from './PowerPointService';
import {PROJECTS} from './getter-types';

const service = new ProjectService();

export const actions: ActionTree<IProjectState, {}> = {

  [FETCH_PROJECTS]({commit}) {
    return service.getProjects()
      .then(response => {
        commit(SET_PROJECTS, response.data);
      });
  },

  [FETCH_ADDONS]({commit}) {
    return service.getProjectAddons()
      .then(response => {
        commit(SET_LINES, response.data.lines);
        commit(SET_PROGRAMS, response.data.programs);
        commit(SET_DOMAINS, response.data.domains);
        commit(SET_TYPES, response.data.types);
        commit(SET_CUSTOMERS, response.data.customers);
        commit(FINISH_LOADING);
      });
  },

  [GENERATE_PRESENTATION]({getters}) {
    return PowerPointService.createProjectsPresentation(getters[PROJECTS]);
  }
};