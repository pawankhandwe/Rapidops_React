import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { Tree ,findParent} from './AddData'
import  AddData  from "./AddData";

const renderComponent = () => render(<BrowserRouter>
    <Tree />
</BrowserRouter>);


describe('render', () => {

    test('option-1', () => {
        renderComponent();
        const option1 = screen.getByTestId('option1');
        expect(option1).toBeInTheDocument();
    })

    test('option-2', () => {
        renderComponent();
        const option2 = screen.getByTestId('option2');
        expect(option2).toBeInTheDocument();
    })

    test('value', () => {
        renderComponent();
        const value = screen.getByTestId('value');
        expect(value).toBeInTheDocument();
    })

    test('remove', () => {
        renderComponent();
        const remove = screen.getByTestId('remove');
        expect(remove).toBeInTheDocument();
    })

    test('Save btn rendering', () => {
        renderComponent();
        const save = screen.getByTestId('save');
        expect(save).toBeInTheDocument();
    })

    test('back btn', () => {
        renderComponent();
        const back = screen.getByRole('button', { name: /back/i });
        expect(back).toBeInTheDocument();
    })

    test('component is rendering without prop', () => {
        renderComponent();
        const ele = screen.getByTestId('tree');
        expect(ele).toBeInTheDocument();
    })

    test('renders tree with named node', () => {
        const nodeName = 'Test Node';
        render(<BrowserRouter><Tree node={nodeName} /></BrowserRouter>);
        const tree = screen.getByTestId('tree');
        expect(tree).toBeInTheDocument();
        expect(tree).toHaveAttribute('data-node', nodeName);
    });

})

describe('button checking', () => {

    test('Back button working and save button navigation', () => {
        renderComponent();
        const back = screen.getByRole('button', { name: /back/i });
        const save_navigate = screen.getByRole('button', { name: /save/i });
        fireEvent.click(save_navigate);
        fireEvent.click(back);
        expect(window.location.pathname).toBe('/');
    })

    test('save button', () => {
        renderComponent();
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
        const save = screen.getByTestId('save');
        expect(save).toBeInTheDocument();
        fireEvent.click(save);
        expect(alertSpy).toBeCalled();
        alertSpy.mockRestore();
    })


    test('save - name falsy', () => {
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
        render(<BrowserRouter><Tree name={''} /></BrowserRouter>);
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);
        expect(alertSpy).toHaveBeenCalledWith('Can not save the Data , Please enter the Name');
    });

    test('save - name', () => {
        const root = { some: 'data' };
        const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => { });
        render(<BrowserRouter><Tree node={root} /></BrowserRouter>);
        const saveButton = screen.getByRole('button', { name: /save/i });
        fireEvent.click(saveButton);
        expect(alertSpy).toHaveBeenCalledWith('Data stored');
    });

    test('adds new condition', () => {
        renderComponent();
        const inputs = screen.getAllByTestId('option1');
        const addConditionButton = screen.getByRole('button', { name: /add condition/i });
        expect(addConditionButton).toBeInTheDocument();
        fireEvent.click(addConditionButton);
        expect(inputs.length).toBe(1);
    });

    test('remove new condition', () => {
        renderComponent();
        const remove = screen.getByTestId('remove');
        expect(remove).toBeInTheDocument();
        fireEvent.click(remove);
    });

    test('adds new group', () => {
        renderComponent();
        const addGroupButton = screen.getByRole('button', { name: /add group/i });
        expect(addGroupButton).toBeInTheDocument();
        fireEvent.click(addGroupButton);
        const nodes = screen.getAllByTestId('node');
        expect(nodes.length).toBe(2);
    });


    test("toggles between AND and OR", () => {
        render(<BrowserRouter><Tree node={{id:1}}></Tree></BrowserRouter>)
        const toggleButton = screen.getByTestId("toggleval");
        fireEvent.click(toggleButton);
        expect(toggleButton).toHaveTextContent("OR");
        fireEvent.click(toggleButton);
        expect(toggleButton).toHaveTextContent("AND");
    });


    test("does not render remove button for node with id 1", () => {
        const node = { id: 1 };
        render(<BrowserRouter><Tree node={node}></Tree></BrowserRouter>)
        const removeButton = screen.queryByRole("button", { name: "Remove" });
        expect(removeButton).not.toBeInTheDocument();
    });


    test("does not render remove button for node with id 2", () => {
        const handleRemoveNode = jest.fn();
        const node = { id: 2 };
        render(<AddData node={node} handleRemoveNode={handleRemoveNode} />);
        const removeButton = screen.queryByRole("button", { name: "Remove" });
        expect(removeButton).toBeInTheDocument();
    });

    // test("should set root state with parsed data from localStorage", () => {
    //     const localStorageMock = {
    //         getItem: jest.fn(),
    //     };
    //     const parsedData = { id: 1, children: [], value: "", btn: "" };
    //     const data = JSON.stringify(parsedData);
    //     localStorageMock.getItem.mockReturnValueOnce(data);
    //     jest.spyOn(Storage.prototype, "getItem").mockImplementation(localStorageMock.getItem);
    //     render(<BrowserRouter><Tree node="test" /></BrowserRouter>);
    //     expect(localStorageMock.getItem).toHaveBeenCalledWith("test");
    //     expect(localStorageMock.getItem).toHaveBeenCalledTimes(1);
    //     expect(screen.getByTestId("tree")).toBeInTheDocument();
    // });


    test("should update name state on input change", () => {
        render(<BrowserRouter><Tree node="" /></BrowserRouter>);
        const nameInput = screen.getByPlaceholderText("Enter the Name");
        userEvent.type(nameInput,"test");
        expect(nameInput).toHaveValue('test');
    });

    test('input Hanlders',()=>{
        renderComponent();
        const option1=screen.getByTestId('option1');
        userEvent.type(option1, "Automobile");
        expect(option1).toHaveValue("Automobile");
        const option2=screen.getByTestId('option2');
        userEvent.type(option2, "Automobile");
        expect(option2).toHaveValue("Automobile");
        const value=screen.getByTestId('value');
        userEvent.type(value, "Automobile");
        expect(value).toHaveValue("Automobile");
    })

      test("should call RemoveNode function when remove button is clicked", () => {
        const test = { "id": 1, "children": [{ "id": 1680613803779, "children": [{ "id": 1680613807723, "children": [], "value": [{ "option1": "", "option2": "", "value": "", "id": 1680613810748 }, { "option1": "", "option2": "", "value": "", "id": 1680613810928 }], "btn": "OR" }], "value": [{ "option1": "", "option2": "", "value": "", "id": 1680613805034 }, { "option1": "", "option2": "", "value": "", "id": 1680613806081 }, { "option1": "", "option2": "", "value": "", "id": 1680613806207 }, { "option1": "", "option2": "", "value": "", "id": 1680613806387 }], "btn": "OR" }], "value": [{ "option1": "hfjfjf", "option2": "vku", "value": "", "id": 1680613648625 }, { "option1": "", "option2": "", "value": "utdutdu", "id": 1680613650456 }, { "option1": "gcugcut", "option2": "", "value": "", "id": 1680613650636 }], "btn": "AND" };
        const RemoveNode = jest.fn();
        render(<BrowserRouter><AddData node={test} RemoveNode={RemoveNode} /></BrowserRouter>);
        const removeButton = screen.getAllByTestId("removebtn");
        fireEvent.click(removeButton[0]);
        expect(RemoveNode).toBeCalled();
      });

    describe('findParent', () => {
        const node = {
          id: 1,
          children: [
            {
              id: 2,
              children: [
                {
                  id: 3,
                  children: []
                }
              ]
            },
            {
              id: 4,
              children: [
                {
                  id: 5,
                  children: [
                    {
                      id: 6,
                      children: []
                    }
                  ]
                }
              ]
            }
          ]
        };
      
        test('returns the node if its id matches the given id', () => {
          const result = findParent(node, 1);
          expect(result).toBe(node);
        });
      
        test('returns undefined if the given id is not found in the tree', () => {
          const result = findParent(node, 7);
          expect(result).toBeUndefined();
        });

        test('returns the child',()=>{
            const result=findParent(node,2);
            expect(result.id).toBe(1);
         })

      });


});





