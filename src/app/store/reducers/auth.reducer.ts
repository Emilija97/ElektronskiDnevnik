import { User } from "src/app/models/user";
import { AuthActionTypes, All } from "../actions/auth.actions";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export function authReducer(state = initialState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      console.log("Usao sam u reducer");
      return {
        ...state,
        errorMessage: "Incorrect email and/or password."
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        errorMessage: null
      };
    }
    case AuthActionTypes.SIGNUPSTUD_SUCCESS: {
      return state;
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        errorMessage: "That email is already in use."
      };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
