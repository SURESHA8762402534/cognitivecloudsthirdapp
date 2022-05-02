import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import Post from "./PostTable";

jest.mock("react-router-dom",()=>{
    return{
        useNavigate:()=> jest.fn()
    }
})

describe('Post component test',()=>{
    it('snap for component',()=>{
        const tree = render(
            <Post/>
        );
        expect(tree).toMatchSnapshot();
        screen.debug()
    });
    jest.setTimeout(10000)
    it('snap for component',async()=>{
        const tree = render(
            <Post/>
        );
        await new Promise((r:any)=>setTimeout(r,5000));

        fireEvent.scroll(window,{target:{scrollY:100}});
        fireEvent.click(screen.getByTestId('row-0'))
    });
    
})