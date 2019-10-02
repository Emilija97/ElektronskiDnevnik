import { Grades } from "src/app/models/grades";
import { All, SubjectActionTypes } from "../actions/subjects.actions";

export interface SubjectState {
  grades: Grades;
  errorMessage: string | null;
}

export const initialState: SubjectState = {
  grades: null,
  errorMessage: null
};

export function subjectReducer(state = initialState, action: All): SubjectState {
  switch (action.type) {
    case SubjectActionTypes.FETCH_SUBJECTS_SUCCESS: {
      console.log("Usao sam u reducer za subjects");
      console.log(state);
      return {
        ...state,
        errorMessage: null,
        grades: {
          serbianLanguage: action.payload.serbianLanguage,
          englishLanguage: action.payload.englishLanguage,
          math: action.payload.math,
          biology: action.payload.biology
        }
      };
    }
    case SubjectActionTypes.FETCH_SUBJECTS_FAILURE: {
      return state;
    }
    case SubjectActionTypes.DELETE_SUCCESS: {
      console.log("Usao sam u reducer za subject");
      return {
        ...state,
        errorMessage: null,
        grades: null
      };
    }
    default:
      return state;
  }
}
