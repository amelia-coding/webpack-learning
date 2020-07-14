/*
 * @Author: your name
 * @Date: 2020-06-29 12:22:07
 * @LastEditTime: 2020-06-29 13:25:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learning\src\server.js
 */
import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import App from './App';

const server = express();
server
  .disable('x-powered-by') //不想让客户端知道我用的是什么框架，降低因为框架漏洞导致的被攻击风险
  // .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', (req, res) => {
    const html = renderToString(<App />);

    res.status(200).send(`
    <!doctype html>
    <html lang="">
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta charSet='utf-8' />
        <title>Welcome to Razzle</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `);
  });

// export default server;
server.listen(3000);
