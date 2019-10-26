import React, { PureComponent } from 'react';
import { Spin, Card, Row, Col, AutoComplete, Input } from 'antd';
import { connect } from 'dva';
// import { getInterests, getCars } from './util'
// import json from './mock'
import style from './style.less';

const { Search } = Input;

@connect(({ tisearch, loading }) => ({
  suggestions: tisearch.suggestions,
  feeds: tisearch.feeds,
  fetchingSuggestions: loading.effects['tisearch/getSearchSuggestions'],
}))
class TiSearch extends PureComponent {
  componentDidMount() {}

  handleSearch = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tisearch/getSearchFeeds',
      payload: {
        query: params,
      },
    });
  };

  handleGetSearchSuggestions = params => {
    const { dispatch } = this.props;
    dispatch({
      type: 'tisearch/getSearchSuggestions',
      payload: {
        query: params,
      },
    });
  };

  renderHeader = () => {
    const { suggestions = [] } = this.props;
    return (
      <Row gutter={20}>
        <Col span={24}>
          <AutoComplete
            dataSource={suggestions}
            // onChange={this.handleGetSearchSuggestions}
            onSelect={this.handleSearch}
            placeholder="Query"
            style={{ width: '100%' }}
            size="large"
            defaultActiveFirstOption
          >
            <Search size="large" enterButton />
          </AutoComplete>
        </Col>
      </Row>
    );
  };

  render() {
    const { fetchingSuggestions = false } = this.props;
    return (
      <Spin spinning={fetchingSuggestions}>
        <Card>{this.renderHeader()}</Card>
      </Spin>
    );
  }
}

export default TiSearch;
