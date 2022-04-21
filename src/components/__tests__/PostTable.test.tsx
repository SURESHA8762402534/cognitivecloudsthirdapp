import PostsTable from "../PostsTable";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen, render} from '@testing-library/react';
import { BrowserRouter, useNavigate } from "react-router-dom";
import RawJSON from "../RawJSON";


it('test snapshot', ()=>{
    const tree = render( 
            <BrowserRouter>
              <RawJSON navigate={()=>{}}></RawJSON>
             </BrowserRouter>)
    expect(tree).toMatchSnapshot()
  })
  
  describe("test on RawJSON component", () => {
    test("test to find button", () => {
      render(
        <BrowserRouter>
          <RawJSON navigate={()=>{}}></RawJSON>
        </BrowserRouter>
      );
      
      const btn = screen.getByRole("button");
      expect(btn).toBeInTheDocument();
      
    });
  });
  

test('table snapshot', ()=>{
    const table = render(
        <BrowserRouter>
         <RawJSON navigate={()=>{}}/>
        </BrowserRouter>
        
    )
    screen.debug()
})

test('raw button call', ()=>{
  const mock = jest.fn()
   render(
      <BrowserRouter>
       <RawJSON navigate={mock}/>
      </BrowserRouter>
      
  )
  fireEvent.click(screen.getByText('Back'))
  expect(mock).toHaveBeenCalled()
 
})