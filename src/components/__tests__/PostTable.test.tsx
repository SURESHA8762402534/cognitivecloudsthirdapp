import PostsTable from "../PostsTable";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, screen, render} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import RawJSON from "../RawJSON";
// import renderer from "react-test-renderer";


test('sample',()=>{
    const tree = true;
    expect(tree).toBe(true)
})

it('test snapshot', ()=>{
    const tree = render( 
            <BrowserRouter>
              <RawJSON></RawJSON>
             </BrowserRouter>)
    expect(tree).toMatchSnapshot()
  })
  
  describe("test on RawJSON component", () => {
    test("test to find button", () => {
      render(
        <BrowserRouter>
          <RawJSON></RawJSON>
        </BrowserRouter>
      );
      const btn = screen.getByRole("button");
      expect(btn).toBeInTheDocument();
    });
  });
  

// test('table snapshot', ()=>{
//     const table = render(
//         <BrowserRouter>
//         <PostsTable navigate={undefined} storedData={undefined} page={undefined} setPage={undefined} />
//         </BrowserRouter>
        
//     )
//     screen.debug()
// })