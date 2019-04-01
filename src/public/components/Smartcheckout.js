import React, { Component } from "react";
import Styles from './Smartcheckout.css';
import FlexView from 'react-flexview';

// const Hello = (props) => (
class Smartcheckout extends Component {
  constructor(props) {
    super(props);
    // console.log(props);
    if (props.contentclient && props.contentclient.length > 0) {
      // let content = props.contenttoClient;
      // console.log(initialData);
      // if (__isBrowser__) {
      //   initialData = window.__initialData__;
      //   delete window.__initialData__;
      // } else {
      //   initialData = props.staticContext.initialData;
      // }
      this.state = { data: props.contentclient };
    }
  }
  render() {
    const staticdata = [
      [{
        content:
        {
          heading: 'Heading',
          description: 'test descriptipn',
          components: [Object]
        },
        global:
        {
          title: 'Smart Check-out',
          back: 'Back',
          submit: 'Submit',
          copyright: '© 2018 - Hotel Beacons GmbH'
        }
      }],
      {
        data: [
          {
            "type": "ADDRESS",
            "label": "Deloitte",
            "address": {
              "street": "Stralauer Allee 22",
              "postal_code": "10245",
              "separator": "-",
              "city": "Berlin",
              "country": "Germany"
            }
          },
          {
            "type": "ADDRESS",
            "label": "Deloitte",
            "address": {
              "street": "Ohlauer Strasse 223",
              "postal_code": "10999",
              "separator": "-",
              "city": "Berlin",
              "country": "Germany"
            }
          }
        ]
      }
    ];
    const { data } = this.state || staticdata;
    console.log('data => ', data);
    return (
      <React.Fragment>
        <div className={Styles.some-page-wrapper}>
          <div className={Styles.row}>
            <div className={Styles.column}>
              <div className={Styles.orange-column}>
                Some Text in Column One
              </div>
            </div>
            <div className={Styles.column}>
              <div className={Styles.blue-column}>
                Some Text in Column Two
              </div>
            </div>
            <div className={Styles.column} >
              <div className={Styles.green-column}>
                Some Text in Column Three
              </div>
            </div>
          </div>
        </div>
          {/* <FlexView hAlignContent='center'>
          <FlexView>left aligned! This is also the default for a row</FlexView>
        </FlexView>

        <FlexView hAlignContent='center'>
          <FlexView>horizontally centered!</FlexView>
        </FlexView>

        <FlexView column hAlignContent='center'>
          <FlexView>right aligned (inside a column)</FlexView>
          <FlexView>right aligned (stacked below his sibling)</FlexView>
        </FlexView> */}
      </React.Fragment>
        );
      }
    }
    
    export default Smartcheckout;
    
    
// import React, {Component} from "react";
        // // import NewsList from "./NewsList";
        // import "isomorphic-fetch";
        
// class Hello extends Component {
//   constructor(props) {
//     super(props);
//     if (props.initialData) {
//       let initialData = props.initialData;
//       // if (__isBrowser__) {
//       //   initialData = window.__initialData__;
//       //   delete window.__initialData__;
//       // } else {
//       //   initialData = props.staticContext.initialData;
//       // }
//       this.state = { data: initialData };
//     }
//   }
//   render() {
//     const { data } = this.state;
//     console.log('data => ', data);
//     // return <NewsList news={news} />;
//   }
// }

// export default Hello;
