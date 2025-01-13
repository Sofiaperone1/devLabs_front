import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store'; // Importa tu store configurado
import TaskForm from '../src/components/forms/TaskForm';

describe('TaskForm Component', () => {
  it('should render the task creation form with required fields', () => {
    // Mock de la función `handleClose`
    const mockHandleClose = jest.fn();
    // Renderiza el componente
    render(
      <Provider store={store}>
        <TaskForm handleClose={mockHandleClose} />
      </Provider>
    );

    // Verifica que el campo de descripción esté presente
    expect(
      screen.getByLabelText('Description of the task')
    ).toBeInTheDocument();
    // Verifica que el botón "Cancel" esté presente
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    // Verifica que el botón "Save" esté presente
    expect(screen.getByText('Save')).toBeInTheDocument();
  });

  it('should call handleClose when clicking on "Cancel"', () => {
    const mockHandleClose = jest.fn();
    render(
      <Provider store={store}>
        <TaskForm handleClose={mockHandleClose} />
      </Provider>
    );
    // Simula el clic en el botón "Cancel"
    fireEvent.click(screen.getByText('Cancel'));
    // Verifica que la función `handleClose` fue llamada
    expect(mockHandleClose).toHaveBeenCalled();
  });
  it('should show error message if "Description" is empty and "Save" is clicked', async () => {
    const mockHandleClose = jest.fn();
    // Renderiza el componente con el Provider
    render(
      <Provider store={store}>
        <TaskForm handleClose={mockHandleClose} />
      </Provider>
    );

    // Encuentra el botón Save
    const saveButton = screen.getByText('Save');
    // Simula clic en el botón Save
    fireEvent.click(saveButton);
    // Busca el mensaje de error
    const errorMessage = await screen.findByText('Description is required');
    expect(errorMessage).toBeInTheDocument();
  });
});
