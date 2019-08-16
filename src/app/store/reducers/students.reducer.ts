import { createEntityAdapter, EntityState, EntityAdapter } from "@ngrx/entity";
import { User } from "src/app/models/user";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Actions, StudActionTypes } from "../actions/students.actions";

export const studentAdapter: EntityAdapter<User> = createEntityAdapter<User>();

export interface StudentState extends EntityState<User> {
  students: User[];
}
const defaultData = {
  students: null
};
export const initialState: StudentState = studentAdapter.getInitialState(
  defaultData
);

export function studentsReducer(
  state: StudentState = initialState,
  action: Actions
) {
  switch (action.type) {
    case StudActionTypes.FETCH_SUCCESS: {
      console.log("Iz reducera " + action.payload);
      return studentAdapter.addAll(action.payload, state);
    }
    case StudActionTypes.REMOVE_SUCCESS: {
      console.log("Usao sam u reducer za remove");
      return studentAdapter.removeOne(action.payload, state);
    }
    default:
      return state;
  }
}

export const getStudState = createFeatureSelector<StudentState>("students");

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = studentAdapter.getSelectors();

export const selectStudentsAll = selectAll;

export const selectAllStudents = createSelector(
  getStudState,
  selectAll
);
