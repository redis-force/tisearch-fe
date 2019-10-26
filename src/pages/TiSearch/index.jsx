import React, { PureComponent } from 'react';
import { Spin, Card, Row, Col, AutoComplete, Input, Icon } from 'antd';
import { connect } from 'dva';
import FeedCard from './FeedCard';
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

  renderTwitterCard = ({ id, timestamp, content, name }) => {
    const getImageViaId = `/avatar/${id % 180}.png`;
    const parsedContent = content.replace(/@([^#|\s]+)\s/g, user => `<span>${user}</span>`);

    return (
      <div className={style.twitterCard}>
        <div className={style.tavatar}>
          <img alt="" src={getImageViaId} />
        </div>
        <div className={style.tmain}>
          <h3>{name}</h3>
          <div className={style.tcontent} dangerouslySetInnerHTML={{ __html: parsedContent }} />
        </div>
        <div className={style.cardType}>
          <Icon type="twitter" size={20} />
        </div>
      </div>
    );
  };

  render() {
    const { fetchingSuggestions = false, feeds } = this.props;
    return (
      <Spin spinning={fetchingSuggestions}>
        <Card>{this.renderHeader()}</Card>

        <div className={style.cardWrapper}>
          {feeds.map(feed => (
            <FeedCard key={feed.id} dataSource={feed} renderCard={this.renderTwitterCard} />
          ))}
        </div>
      </Spin>
    );
  }
}

export default TiSearch;
