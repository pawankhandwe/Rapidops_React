import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('component is rendering',()=>{
    render(<BrowserRouter><App/></BrowserRouter>)
    const ele=screen.getByTestId('app');
    expect(ele).toBeInTheDocument();
})

