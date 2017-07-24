import React, { Component } from 'react';
import BoolCDQ from './components/BoolCDQ';
import CatCDQ from './components/CatCDQ';
import OrdCDQ from './components/OrdCDQ';
import QuantCDQ from './components/QuantCDQ';

class App extends Component {
  render() {
    return (
      <div>
        <BoolCDQ metrics={bool_cdq.metrics} config={bool_cdq.config} pref={bool_cdq.pref} handler={bool_cdq.handler}/>
        <CatCDQ metrics={cat_cdq.metrics} config={cat_cdq.config} pref={cat_cdq.pref} handler={cat_cdq.handler}/>
        <OrdCDQ metrics={ord_cdq.metrics} config={ord_cdq.config} pref={ord_cdq.pref} handler={ord_cdq.handler}/>
        <QuantCDQ metrics={quant_cdq.metrics} config={quant_cdq.config} pref={ord_cdq.pref} handler={quant_cdq.handler}/>
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
      socket.emit('selection0', selection);
    },
    socketHandler: function (setPreference, initialSelection) {
      socket.emit('selection0', initialSelection);
      socket.emit('request0');
      socket.on('preference0', (newSelection) => {
        setPreference(newSelection.u_id, newSelection.selection);
      });
      setInterval(() => {
        socket.emit('request0');
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
    {u_id:"user_1", u_name:"Name 1", u_imgpath: null},
    {u_id:"user_2", u_name:"Name 2", u_imgpath: null},
    {u_id:"user_3", u_name:"Name 3", u_imgpath: null},
    {u_id:"user_4", u_name:"Name 4", u_imgpath: null}
  ],
  handler: {
    socketUrl: 'http://localhost:17322',
    onSelectChange: function (selection){
      socket1.emit('selection1', selection);
    },
    socketHandler: function (setPreference, initialSelection) {
      socket1.emit('selection1', initialSelection);
      socket1.emit('request1');
      socket1.on('preference1', (newSelection) => {
        setPreference(newSelection.u_id, newSelection.selection);
      });
      setInterval(() => {
        socket1.emit('request1');
      }, 10000);
    }
  }
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
    {u_id:"user_1", u_name:"Name 1", u_imgpath: null},
    {u_id:"user_2", u_name:"Name 2", u_imgpath: null},
    {u_id:"user_3", u_name:"Name 3", u_imgpath: null},
    {u_id:"user_4", u_name:"Name 4", u_imgpath: null}
  ],
  handler: {
    socketUrl: 'http://localhost:17322',
    onSelectChange: function (selection){
      socket2.emit('selection2', selection);
    },
    socketHandler: function (setPreference, initialSelection) {
      socket2.emit('selection2', initialSelection);
      socket2.emit('request2');
      socket2.on('preference2', (newSelection) => {
        setPreference(newSelection.u_id, newSelection.selection);
      });
      setInterval(() => {
        socket2.emit('request2');
      }, 10000);
    }
  }
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
    {u_id:"user_1", u_name:"Name 1", u_imgpath: null},
    {u_id:"user_2", u_name:"Name 2", u_imgpath: null},
    {u_id:"user_3", u_name:"Name 3", u_imgpath: null},
    {u_id:"user_4", u_name:"Name 4", u_imgpath: null}
  ],
  handler: {
    socketUrl: 'http://localhost:17322',
    onSelectChange: function (selection){
      socket3.emit('selection3', selection);
    },
    socketHandler: function (setPreference, initialSelection) {
      socket3.emit('selection3', initialSelection);
      socket3.emit('request3');
      socket3.on('preference3', (newSelection) => {
        setPreference(newSelection.u_id, newSelection.selection);
      });
      setInterval(() => {
        socket3.emit('request3');
      }, 10000);
    }
  }
};

export default App;