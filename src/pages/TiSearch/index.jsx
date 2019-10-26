import React, { PureComponent } from 'react';
import { Spin, Button, Row, Col, AutoComplete, Input, Icon, Tag } from 'antd';
import { connect } from 'dva';
import FeedCard from './FeedCard';
import style from './style.less';

@connect(({ tisearch, loading }) => ({
  feeds: tisearch.feeds,
  fetchingSuggestions: loading.effects['tisearch/getSearchSuggestions'],
}))
class TiSearch extends PureComponent {
  state = {
    query: '',
    suggestions: [
      'SELECT * FROM',
      'SELECT * FROM tweets',
      'SELECT * FROM users',
      "SELECT * FROM tweets WHERE MATCH(content) AGAINST ('')",
      "SELECT * FROM tweets WHERE MATCH (content) AGAINST ('database' IN NATURE LANGUAGE MODE)",
      "SELECT * FROM users WHERE MATCH () AGAINST ('' IN BOOLEAN MODE)",
    ],
  };

  componentDidMount() {
    // console.log(document.querySelector('#root'))
  }

  handleSearch = () => {
    const { dispatch } = this.props;
    const { query } = this.state;

    if (!query) {
      return;
    }

    dispatch({
      type: 'tisearch/getSearchFeeds',
      payload: {
        q: query,
      },
    });
  };

  handleQueryChange = query => {
    this.setState(state => ({
      ...state,
      query,
    }));
  };

  renderHeader = () => {
    const { query, suggestions } = this.state;
    return (
      <Row gutter={0}>
        <Col span={23}>
          <AutoComplete
            dataSource={suggestions}
            value={query}
            onChange={this.handleQueryChange}
            style={{ width: '100%' }}
            size="large"
            defaultActiveFirstOption
            filterOption={(iv, { key }) => {
              return key.startsWith(iv) && key !== iv;
            }}
          >
            <Input
              size="large"
              placeholder="Type SQL"
              onPressEnter={this.handleSearch}
              style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0, borderRight: 'none' }}
            />
          </AutoComplete>
        </Col>
        <Col span={1}>
          <Button
            icon="search"
            size="large"
            style={{ width: '100%', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            type="primary"
            onClick={this.handleSearch}
          />
        </Col>
      </Row>
    );
  };

  renderTwitterCard = ({ id, timestamp, content, user }) => {
    const getImageViaId = `/avatar/${id % 174}.png`;
    const parsedContent = content.replace(/@([^#|\s]+)\s/g, user => `<span>${user}</span>`);

    return (
      <div className={style.twitterCard}>
        <div className={style.tavatar}>
          <img alt="" src={getImageViaId} />
        </div>
        <div className={style.tmain}>
          <h3>{user}</h3>
          <div className={style.tcontent} dangerouslySetInnerHTML={{ __html: parsedContent }} />
        </div>
        <div className={style.tcardType}>
          <Icon type="twitter" size={20} />
        </div>
      </div>
    );
  };

  renderPersonCard = ({ id, gender, name, place, picture, cars, interests }) => {
    const getImageViaId = `/avatar/${(id + 100) % 174}.png`;

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
              Interests:
              <br />
              {interests.map((item, index) => (
                <Tag color="purple" key={index}>
                  {item}
                </Tag>
              ))}
            </div>
          )}
          {cars && Boolean(cars.length) && (
            <div className={style.plist}>
              Cars:
              <br />
              {cars.map((item, index) => (
                <Tag color="purple" key={index}>
                  {item}
                </Tag>
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
    const {
      fetchingSuggestions = false,
      feeds: { type, data },
    } = this.props;
    return (
      <Spin spinning={fetchingSuggestions}>
        {/* <iframe className={style.frame} src="/matrix.html" title="matrix" /> */}
        {/* <Card bordered={false} className={style.searchWrapper}> */}
        {this.renderHeader()}
        {/* </Card> */}
        <div className={style.cardWrapper}>
          {data.map(feed => (
            <FeedCard
              key={feed.id}
              dataSource={feed}
              renderCard={type === 'tweets' ? this.renderTwitterCard : this.renderPersonCard}
            />
          ))}
        </div>
      </Spin>
    );
  }
}

export default TiSearch;
