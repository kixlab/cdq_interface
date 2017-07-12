import React, { Component } from 'react';
import BoolCDQ from './components/BoolCDQ';
import CatCDQ from './components/CatCDQ';

class App extends Component {
  render() {
    return (
      <div>
        <BoolCDQ metrics={bool_cdq.metrics} config={bool_cdq.config} pref={bool_cdq.pref}/>
        <CatCDQ metrics={cat_cdq.metrics} config={cat_cdq.config} pref={cat_cdq.pref}/>
      </div>
    );
  }
}

const bool_cdq = {
  config: {
    criterion_name: "Parking Friendly",
    criterion_id: "parking",
    default_selection: true,
    anonymize: false
  },
  metrics: {
    h_space_top : 30,
    h_subject : 30,
    h_space_subject_me : 30,
    h_me : 50,
    h_space_me_others : 20,
    h_space_between : 2,
    h_other : 25,
    h_space_bottom : 50,
    w_space_padding : 30,
    w_space_between : 5,
    w_button : 259,
    button_radius : 15
  },
  pref: [
    {u_id:"user_1", u_name:"Name 1", u_imgpath: null, selection: true},
    {u_id:"user_2", u_name:"Name 2", u_imgpath: null, selection: true},
    {u_id:"user_3", u_name:"Name 3", u_imgpath: null, selection: false},
    {u_id:"user_4", u_name:"Name 4", u_imgpath: null, selection: false}
  ]
};

const cat_cdq = {
  config: {
    criterion_name: "Types of Restaurant",
    criterion_id: "type_of_rest",
    categories_name:["Chinese", "American", "Korean", "French", "Indian"],
    default_selection: [false, false, false, false, true],
    anonymize: false
  },
  metrics: {
    h_space_top : 30,
    h_subject : 30,
    h_space_subject_me : 30,
    h_me : 50,
    h_space_me_others : 30,
    h_space_between : 2,
    h_other : 25,
    h_space_bottom : 50,
    w_space_padding : 30,
    w_space_between : 5,
    w_button : 170,
    button_radius : 15
  },
  pref: [
    {u_id:"user_1", u_name:"Name 1", u_imgpath: null, selection: [true, false, false, true, true]},
    {u_id:"user_2", u_name:"Name 2", u_imgpath: null, selection: [true, false, true, true, true]},
    {u_id:"user_3", u_name:"Name 3", u_imgpath: null, selection: [true, false, true, false, true]},
    {u_id:"user_4", u_name:"Name 4", u_imgpath: null, selection: [true, true, false, true, true]}
  ]
};


export default App;