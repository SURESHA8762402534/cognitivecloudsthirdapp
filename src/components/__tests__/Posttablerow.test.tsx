import { screen, render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PostsTable from "../PostsTable";


test('table snapshot', ()=>{
    const table = render(
        <BrowserRouter>
        <PostsTable navigate={()=>{}} storedData={()=>{}} page={()=>{}} setPage={()=>{}} />
        </BrowserRouter>
        
    )
    expect(table).toMatchSnapshot()
})


test('table snapshot', ()=>{
    // const match = jest.fn()
    render(
        <BrowserRouter>
        <PostsTable navigate={()=>{}} storedData={()=>{}} page={()=>{}} setPage={()=>{}} />
        </BrowserRouter>
        
    )
    // const row = render(<tr/>)
    // fireEvent.click(screen.getByRole('tr'));
    // expect(match).toHaveBeenCalled();
    screen.debug()
})

