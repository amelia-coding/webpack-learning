/*
 * @Author: your name
 * @Date: 2020-06-29 12:24:58
 * @LastEditTime: 2020-06-29 12:59:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \webpack-learning\src\App.js
 */

import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import styles from './App.css';
console.log('---', styles);

const App = () => (
  <>
    <Button>App</Button>
    <button className={styles.btn}>Test</button>
  </>
);

export default App;
