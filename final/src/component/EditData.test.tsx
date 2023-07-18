import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EditData } from './EditData';

test('component is rendering without prop',()=>{
    render(<BrowserRouter><EditData/></BrowserRouter>)
    const ele=screen.getByTestId('edit');
    expect(ele).toBeInTheDocument();
})

