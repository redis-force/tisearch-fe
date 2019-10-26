import React, { PureComponent } from 'react';
import { Spin, Card, Row, Col, AutoComplete, Input, Icon, Tag } from 'antd';
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
        <div className={style.tcardType}>
          <Icon type="twitter" size={20} />
        </div>
      </div>
    );
  };

  renderPersonCard = ({ id, gender, name, place, picture, cars, interests }) => {
    const getImageViaId = `/avatar/${(id + 100) % 180}.png`;

    return (
      <div className={style.personCard}>
        <div className={style.pavatar}>
          <img alt="" src={getImageViaId} />
        </div>
        <div className={style.pmain}>
          <h3 className={style.info}>
            {name}
            {gender === 'male' && <Icon type="man" style={{ color: '#1890FF' }} />}
            {gender === 'female' && <Icon type="woman" style={{ color: '#f08080' }} />}
            <span>{place}</span>
          </h3>
          {interests && Boolean(interests.length) && (
            <div className={style.plist}>
              Interests: &nbsp;
              {interests.map(item => (
                <Tag color="blue">{item}</Tag>
              ))}
            </div>
          )}
          {cars && Boolean(cars.length) && (
            <div className={style.plist}>
              Cars: &nbsp;
              {cars.map(item => (
                <Tag color="blue">{item}</Tag>
              ))}
            </div>
          )}
          <div className={style.pcardType}>
            <Icon type="facebook" size={20} />
          </div>
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
            <FeedCard
              key={feed.id}
              dataSource={feed}
              renderCard={feed.type === 'people' ? this.renderPersonCard : this.renderTwitterCard}
            />
          ))}
        </div>
      </Spin>
    );
  }
}

export default TiSearch;
