import React from 'react';
import { Input } from 'antd';

const { Search } = Input;
export default () => (
  <div id="components-input-demo-search-input">
    <div>
      <Search
        size="large"
        placeholder="input search text"
        onSearch={value => console.log(value)}
        enterButton
      />
    </div>
  </div>
);
