import { expect } from 'chai'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'
import Smartcheckout from '../src/public/components/Smartcheckout'

Enzyme.configure({ adapter: new Adapter() })

describe('<Smartcheckout />', () => {
  it('renders <Smartcheckout />', () => {
    const staticdata = [
      [{
        content:
        {
          heading: 'Heading',
          description: 'test descriptipn',
          components: {
            add_new_address: {
              heading: "Add New",
              description: "Billing Address"
          }
          }
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

    const wrapper = shallow(<Smartcheckout contentclient={staticdata} />)
    const actual = wrapper.find('h1').text()
    const expected = 'Hello, tests!'

    expect(actual).to.be.equal(expected)
  })
})
