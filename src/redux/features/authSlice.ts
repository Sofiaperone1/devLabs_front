import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '../store';

// Tipos
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Estado inicial
const initialState: AuthState = {
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isAuthenticated:
    typeof window !== 'undefined' ? !!localStorage.getItem('token') : false,
  isLoading: false,
  error: null,
};

// Thunk para obtener el token
export const fetchAuthToken = createAsyncThunk(
  'auth/fetchToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/auth/token', {
        headers: {
          audience: 'https://dev-labs-api/',
        },
      });
      if (!response.ok) throw new Error('Failed to fetch token');
      const { accessToken } = await response.json();
      return accessToken;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAuthToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAuthToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.isAuthenticated = true;
        if (typeof window !== 'undefined') {
          localStorage.setItem('token', action.payload);
        }
      })
      .addCase(fetchAuthToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

// Actions
export const { clearToken } = authSlice.actions;

// Selector personalizado
const selectAuth = (state: RootState) => state.auth;

// Hook integrado
export const useAuth = () => {
  const { user, isLoading: isAuth0Loading } = useUser();
  const dispatch = useDispatch<AppDispatch>();
  const auth = useSelector(selectAuth);

  useEffect(() => {
    if (!isAuth0Loading) {
      if (user) {
        console.log('esta cargando?', isAuth0Loading);
        dispatch(fetchAuthToken());
      } else {
        dispatch(clearToken());
      }
    }
  }, [user, isAuth0Loading, dispatch]);

  return {
    ...auth,
    isLoading: isAuth0Loading || auth.isLoading,
    user,
  };
};

export default authSlice.reducer;
