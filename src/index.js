import compression from 'compression'
import express from 'express'
import path from 'path'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import Smartcheckout from './public/components/Smartcheckout'
import MultipleRoutes from './public/components/MultipleRoutes'
import "isomorphic-fetch";
const app = express()

app.use(compression())

app.use('/static', express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {


  let apiurls = [
    'https://rawgit.com/rohit-dantas-conichi/3cf7d1da56f60959adfc4664cff31189/raw/e97db2ad3940dce2a7da1ececcc1375b1f46311d/page-select_billing_address-en.json',
    'https://rawgit.com/rohit-dantas-conichi/48635f6c8eead55a4b16e8670a813ac5/raw/eefc1c5180234519816df4d7293892fb92bab0e0/organism-billing_addresses-en.json'
  ];


  
  Promise.all(apiurls.map(url =>
    fetch(url)
      .then(checkStatus)
      .then(parseJSON)
      .catch(error => console.log('There was a problem!', error))
  ))
    .then(apiData => {
    // console.log(apiData)
    // const { name = 'Marvelous Wololo' } = req.query

    // const componentStream = ReactDOMServer.renderToNodeStream(
    //   <Hello name={name} />
    // )
    // const context = {
    //     content: {
    //      initialData.content
    //     }
    //    };
    //   const name = 'Marvelous Wololo';

    //   const markup = ReactDOMServer.renderToString(
    //     // <Router location={req.url} context={name} >
    //     <Hello context={name} />
    //     // </Router>
    //   );
    //   res.send(`
    //   <!doctype html>
    //   <html>
    //   <head>
    //     <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
    //     <script>window.__initialData__ = ${JSON.stringify({ name })}</script>
    //   </head>
    //   <body>
    //   <div id="root">${markup}</div>
    //   <script src="/static/vendors~home.js~multipleRoutes.js"></script>
    //   <script src="/static/home.js"></script>
    // </body>
    // </html>`)

    // const { name = 'Marvelous Wololo' } = req.query

    // const name = 'Marvelous Wololo';

    const content = apiData[0].content;
    const global  = apiData[0].global;
    const data    = apiData[1].data;

    console.log(data[0].content, data[0].global, data[1].data );

    const contentclient = [{
      content,
      global,
      data
    }]
    const componentStream = ReactDOMServer.renderToNodeStream(
      <Smartcheckout contentclient={contentclient} />
    )

    const htmlStart = `
  <!doctype html>
    <html>
    <head>
      <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <script>window.__INITIAL__DATA__ = ${JSON.stringify({ contentclient })}</script>

    </head>
    <body>
    <div id="root">`

    res.write(htmlStart)

    componentStream.pipe(
      res,
      { end: false }
    )

    const htmlEnd = `</div>
    <script src="/static/vendors~home.js~multipleRoutes.js"></script>
    <script src="/static/home.js"></script>
  </body>
  </html>`

    componentStream.on('end', () => {
      res.write(htmlEnd)
      res.end()
    })


  })

  function checkStatus(response) {
    if (response.ok) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(new Error(response.statusText));
    }
  }

  function parseJSON(response) {
    return response.json();
  }


  // const htmlStart = `


  // res.write(htmlStart)

  // componentStream.pipe(
  //   res,
  //   { end: false }
  // )


  // componentStream.on('end', () => {
  //   res.write(htmlEnd)

  //   res.end()
  // })
})

// app.get('/with-react-router*', (req, res) => {
//   const context = {}

//   const component = ReactDOMServer.renderToString(
//     <Router location={req.url} context={context}>
//       <MultipleRoutes />
//     </Router>
//   )

//   const html = `
//   <!doctype html>
//     <html>
//     <head>
//       <link rel='shortcut icon' type='image/x-icon' href='/static/favicon.ico' />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <meta http-equiv="X-UA-Compatible" content="ie=edge">
//     </head>
//     <body>
//       <div id="root">${component}</div>

//       <script src="/static/vendors~home.js~multipleRoutes.js"></script>
//       <script src="/static/vendors~multipleRoutes.js"></script>
//       <script src="/static/multipleRoutes.js"></script>
//     </body>
//     </html>
//   `

//   if (context.url) {
//     res.writeHead(301, { Location: context.url })
//     res.end()
//   } else {
//     res.send(html)
//   }
// })

app.get('*', (req, res) =>
  res
    .status(404)
    .send(
      `<body style="background-color: #3c3c3c;"><h1 style="font-family: sans-serif; color: #c7c7c7; text-align: center;">404 - Not Found</h1></body>`
    )
)

const { PORT = 3000 } = process.env

app.listen(PORT, () => console.log('######## app running ########'))
