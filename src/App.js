import React, { Component } from 'react';
import BoolCDQ from './components/BoolCDQ';
import CatCDQ from './components/CatCDQ';
import OrdCDQ from './components/OrdCDQ';
import QuantCDQ from './components/QuantCDQ';
import io from 'socket.io-client';

class App extends Component {
  render() {
    return (
      <div>
        <BoolCDQ metrics={bool_cdq.metrics} config={bool_cdq.config} pref={bool_cdq.pref} handler={bool_cdq.handler}/>
        <CatCDQ metrics={cat_cdq.metrics} config={cat_cdq.config} pref={cat_cdq.pref} />
        <OrdCDQ metrics={ord_cdq.metrics} config={ord_cdq.config} pref={ord_cdq.pref} />
        <QuantCDQ metrics={quant_cdq.metrics} config={quant_cdq.config} pref={ord_cdq.pref} />
      </div>
    );
  }
}

const socket = io('http://localhost:17322');

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
    h_space_between : 5,
    h_other : 25,
    h_space_bottom : 50,
    w_space_padding : 30,
    w_space_between : 5,
    w_button : 259,
    button_radius : 15
  },
  pref: [
    {u_id:"user_1", u_name:"Name 1", u_imgpath: null},
    {u_id:"user_2", u_name:"Name 2", u_imgpath: null},
    {u_id:"user_3", u_name:"Name 3", u_imgpath: null},
    {u_id:"user_4", u_name:"Name 4", u_imgpath: null}
  ],
  handler: {
    socketUrl: 'http://localhost:17322',
    onSelectChange: function (selection){
      socket.emit('selection', selection);
    },
    socketHandler: function (setPreference, initialSelection) {
      socket.emit('selection', initialSelection);
      socket.emit('request');
      socket.on('preference', (newSelection) => {
        setPreference(newSelection.u_id, newSelection.selection);
      });
      setInterval(() => {
        socket.emit('request');
      }, 10000);
    }
  }
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
    h_space_between : 5,
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

const ord_cdq = {
  config: {
    criterion_name: "Price Range",
    criterion_id: "price_range",
    tick_num: 6,
    label: ["$", "$$", "$$$", "$$$$", "$$$$$"],
    range_MinMax: [true, true],
    default_selection: [2, 3],
    anonymize: false
  },
  metrics: {
    h_space_top : 30,
    h_subject: 30,
    h_space_subject_txt: 15,
    h_txt: 24,
    h_tick: 12,
    h_space_between: 5,
    h_me: 40,
    h_space_me_others: 20,
    h_other: 25,
    h_space_bottom: 50,
    w_space_padding: 30,
    w_between_tick: 120,
    bar_radius : 20,
    handle_radius : 8,
    handle_width: 15
  },
  pref: [
    {u_id:"user_1", u_name:"Name 1", u_imgpath: null, selection: [3,5]},
    {u_id:"user_2", u_name:"Name 2", u_imgpath: null, selection: [1,2]},
    {u_id:"user_3", u_name:"Name 3", u_imgpath: null, selection: [1,4]},
    {u_id:"user_4", u_name:"Name 4", u_imgpath: null, selection: [2,3]}
  ]
};

const  quant_cdq = {
  config: {
    criterion_name: "Review Ratings",
    criterion_id: "review_ratings",
    interval: 0.5,
    tick_interval: 0.5,
    range: [0, 5],
    range_MinMax: [true, true],
    default_selection: [2, 3],
    anonymize: false
  },
  metrics: {
    h_space_top : 30,
    h_subject: 30,
    h_space_subject_txt: 15,
    h_txt: 24,
    h_tick: 12,
    h_space_between: 5,
    h_me: 40,
    h_space_me_others: 20,
    h_other: 25,
    h_space_bottom: 50,
    w_space_padding: 30,
    w_range: 600,
    bar_radius : 20,
    handle_radius : 8,
    handle_width: 15
  },
  pref: [
    {u_id:"user_1", u_name:"Name 1", u_imgpath: null, selection: [3,5]},
    {u_id:"user_2", u_name:"Name 2", u_imgpath: null, selection: [1,2]},
    {u_id:"user_3", u_name:"Name 3", u_imgpath: null, selection: [1,4]},
    {u_id:"user_4", u_name:"Name 4", u_imgpath: null, selection: [2,3]}
  ]
};

export default App;