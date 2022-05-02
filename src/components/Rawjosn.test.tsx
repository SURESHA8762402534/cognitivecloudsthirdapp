import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import Post from "./PostTable";
import RawJSON from "./Rawjson";

jest.mock("react-router-dom",()=>{
    return{
        useNavigate:()=> jest.fn(),
        useLocation:()=>{
            return{
                state:{}
            }
        }
    }
})

describe('rawjson component test',()=>{
    it('snap for component',()=>{
        const tree = render(
            <RawJSON/>
        );
        expect(tree).toMatchSnapshot();
        screen.debug()
    });

    it('snap for component',()=>{
        const tree = render(
            <RawJSON/>
        );

        fireEvent.scroll(window,{target:{scrollY:0}});
        fireEvent.click(screen.getByRole('button'))
    });
    
})