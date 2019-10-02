import { User } from "src/app/models/user";
import { AuthActionTypes, All } from "../actions/auth.actions";
import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createFeatureSelector } from "@ngrx/store";

export interface AuthState {
  isLoggedIn: boolean;
  user: User;
  errorMessage: string;
  showInvalid: boolean;
}

export const initialState: AuthState = {
  isLoggedIn: false,
  user: {
    id: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
    averageGrade: ""
  },
  errorMessage: "",
  showInvalid: false
};

export function authReducer(state: AuthState = initialState, action: All): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      action.payload["password"] = undefined;
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        errorMessage: "",
        showInvalid: false
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      console.log("Usao sam u reducer");
      return {
        ...state,
        ...initialState,
        errorMessage: "Incorrect email and/or password.",
        showInvalid: true
      };
    }
    case AuthActionTypes.SIGNUP_SUCCESS: {
      action.payload["password"] = undefined;
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        errorMessage: "",
        showInvalid: false
      };
    }
    case AuthActionTypes.SIGNUPSTUD_SUCCESS: {
      return state;
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      console.log("Signup failure");
      return {
        ...state,
        ...initialState,
        errorMessage: "That email is already in use.",
        showInvalid: true
      };
    }
    case AuthActionTypes.CHECK_USER_SUCCESS: {
      action.payload["password"] = undefined;
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
        errorMessage: "",
        showInvalid: false
      };
    }
    case AuthActionTypes.CHECK_USER_FAILURE: {
      localStorage.removeItem("token");
      return { ...state, ...initialState };
    }
    case AuthActionTypes.SHOW_INVALID: {
      return { ...state, showInvalid: true };
    }
    case AuthActionTypes.RESET_ERROR_MESSAGE: {
      return { ...state, errorMessage: "", showInvalid: false };
    }
    case AuthActionTypes.LOGOUT: {
      return initialState;
    }
    default: {
      return state;
    }
  }
}
