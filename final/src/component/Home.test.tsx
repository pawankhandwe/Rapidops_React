import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

const renderComponent = () => render(<BrowserRouter>
    <Home />
</BrowserRouter>);


test('renders Home component', () => {
    renderComponent();
    const addDataButton = screen.getByRole('button', { name: /add data/i });
    expect(addDataButton).toBeInTheDocument();
    fireEvent.click(addDataButton);
    expect(window.location.pathname).toBe('/Tree');
});


test('renders no data if local storage is empty', () => {
    localStorage.clear();
    renderComponent();
    const noDataElement = screen.getByText(/no data/i);
    expect(noDataElement).toBeInTheDocument();
});

test('edit button', () => {
    const test = { "id": 1, "children": [{ "id": 1680613803779, "children": [{ "id": 1680613807723, "children": [], "value": [{ "option1": "", "option2": "", "value": "", "id": 1680613810748 }, { "option1": "", "option2": "", "value": "", "id": 1680613810928 }], "btn": "OR" }], "value": [{ "option1": "", "option2": "", "value": "", "id": 1680613805034 }, { "option1": "", "option2": "", "value": "", "id": 1680613806081 }, { "option1": "", "option2": "", "value": "", "id": 1680613806207 }, { "option1": "", "option2": "", "value": "", "id": 1680613806387 }], "btn": "OR" }], "value": [{ "option1": "hfjfjf", "option2": "vku", "value": "", "id": 1680613648625 }, { "option1": "", "option2": "", "value": "utdutdu", "id": 1680613650456 }, { "option1": "gcugcut", "option2": "", "value": "", "id": 1680613650636 }], "btn": "AND" };
    localStorage.setItem("test", JSON.stringify(test));
    renderComponent();
    const addDataButton = screen.getByRole('button', { name: /edit data/i });
    expect(addDataButton).toBeInTheDocument();
    fireEvent.click(addDataButton);
    expect(window.location.pathname).toBe('/EditData/test');
})
