import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../App";

describe('app component test',()=>{
    it('snap for component',()=>{
        const tree = render(
            <BrowserRouter><App/></BrowserRouter>
        );
        expect(tree).toMatchSnapshot();
        screen.debug()
    })
})