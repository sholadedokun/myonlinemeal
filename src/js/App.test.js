
import React, { Component } from 'react'
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer'
import App from './App'
// import Header from './components/header'
import configureStore from 'redux-mock-store'
import {Provider} from 'react-redux'
// import {addInputs,subtractInputs} from '../src/js/actions/calculatorActions'
import {createStore} from 'redux'
// import calculatorReducers from '../src/js/reducers/calculatorReducers'

const initialState = {user:{error:'', authenticated:'', isOpen:false, page:'login'}}
   const mockStore = configureStore()
   let store,wrapper

   beforeEach(()=>{
       store = mockStore(initialState)
       // wrapper = mount( <Provider store={store}><App /></App> )
   })



// Snapshot for APP React Component

describe('>>>APP --- Snapshot',()=>{
    it('+++capturing Snapshot of APP', () => {
        const renderedValue =  renderer.create(<Provider store={store}><App /></Provider>).toJSON()
        expect(renderedValue).toMatchSnapshot();
    });

});

describe('>>>APP --- Shallow Render REACT COMPONENTS',()=>{
    let wrapper
    beforeEach(()=>{
        wrapper = mount(<Provider store={store}><App /></Provider>)
    })

    it('+++ render the DUMB component', () => {
       expect(wrapper.length).toEqual(1)
    });
    it('+++ render the Header AND FOOTER component', () => {
       expect(wrapper.find('Header').length).toEqual(1)
       expect(wrapper.find('Footer').length).toEqual(1)
    });
    it('+++ Loads the Modal When Login is clicked', () => {
        let header=wrapper.find('Header')
        console.log(header.find('NavItem#login').debug())
        wrapper.find('NavItem#login').simulate('click');
        console.log(wrapper.debug())
       expect(wrapper.find('.loginModal').length).toEqual(1)
       expect(wrapper.find('Footer').length).toEqual(1)
    });
})
