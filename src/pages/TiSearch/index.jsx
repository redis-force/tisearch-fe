import React, { PureComponent } from 'react';
import { Spin, Card } from 'antd';
import styles from './index.less';
import InputSearchInput from './InputSearchInput';

class TiSearch extends PureComponent {
  render() {
    return (
      <Card>
        <InputSearchInput />
      </Card>
    );
  }
}

export default TiSearch;
