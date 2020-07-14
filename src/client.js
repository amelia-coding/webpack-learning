/*
 * @Author: your name
 * @Date: 2020-06-11 13:17:20
 * @LastEditTime: 2020-06-29 12:31:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learning\src\client.js
 */
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';

ReactDom.hydrate(<App />, document.getElementById('app'));
