import React, { Component } from 'react';
import BoolCDQ from './components/BoolCDQ'

class App extends Component {
  render() {
    return (
      <div>
        <BoolCDQ metrics={metrics} config={config} pref={pref}/>
      </div>
    );
  }
}

const config = {
  criterion_name: "Parking Friendly",
  criterion_id: "parking",
  default_selection: true,
  anonymize: false
};

const metrics = {
  h_space_top : 30,
  h_subject : 30,
  h_space_subject_me : 30,
  h_me : 50,
  h_space_me_others : 30,
  h_space_between : 3,
  h_other : 25,
  h_space_bottom : 50,
  w_space_padding : 30,
  w_space_between : 5,
  w_button : 170
};

const pref = [
  {u_id:"user_1", u_name:"Name 1", u_imgpath: null, selection: true},
  {u_id:"user_2", u_name:"Name 2", u_imgpath: null, selection: true},
  {u_id:"user_3", u_name:"Name 3", u_imgpath: null, selection: true},
  {u_id:"user_4", u_name:"Name 4", u_imgpath: null, selection: false}
];

export default App;