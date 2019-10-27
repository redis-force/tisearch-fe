import React, { PureComponent } from 'react';
import { Spin, Button, Row, Col, AutoComplete, Input, Icon, Tag, Modal, Table } from 'antd';
import { connect } from 'dva';
import router from 'umi/router';
import FeedCard from './FeedCard';
import style from './style.less';

const PLAN_COLUMNS = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: 'count',
    dataIndex: 'count',
  },
  {
    title: 'task',
    dataIndex: 'task',
  },
  {
    title: 'operation_info',
    dataIndex: 'operation_info',
  },
];

@connect(({ tisearch, loading }) => ({
  feeds: tisearch.feeds,
  fetchingSuggestions: loading.effects['tisearch/getSearchSuggestions'],
}))
class TiSearch extends PureComponent {
  constructor(props) {
    super(props);
    const {
      location: {
        query: { q },
      },
    } = props;
    this.state = {
      query: q,
      modalVisible: false,
      suggestions: [
        'SELECT * FROM',
        'SELECT * FROM tweets',
        'SELECT * FROM users',
        "SELECT * FROM tweets WHERE MATCH(content) AGAINST ('')",
        "SELECT * FROM tweets WHERE MATCH (content) AGAINST ('database' IN NATURE LANGUAGE MODE)",
        "SELECT * FROM users WHERE MATCH () AGAINST ('' IN BOOLEAN MODE)",
      ],
    };
  }

  componentDidMount() {
    this.handleSearch();
  }

  handleSearch = () => {
    const { dispatch } = this.props;
    const { query } = this.state;

    if (!query) {
      return;
    }

    router.replace({
      pathname: '/ti-search',
      query: {
        q: query,
      },
    });

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

  renderTwitterCard = ({ id, content, user, time }) => {
    const getImageViaId = `/avatar/${id % 174}.png`;
    const parsedContent = content.replace(/@([^#|\s]+)\s/g, match => `<span>${match}</span>`);

    return (
      <div className={style.twitterCard}>
        <div className={style.tavatar}>
          <img alt="" src={getImageViaId} />
        </div>
        <div className={style.tmain}>
          <h3>{user}</h3>
          <div className={style.tcontent} dangerouslySetInnerHTML={{ __html: parsedContent }} />
          <div className={style.ttime}>{time}</div>
        </div>
        <div className={style.tcardType}>
          <Icon type="twitter" size={20} />
        </div>
      </div>
    );
  };

  renderPersonCard = ({ id, gender, name, place, cars, interests }) => {
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
      feeds: { data, plans },
    } = this.props;
    const { modalVisible } = this.state;

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
              renderCard={
                feed.content !== undefined ? this.renderTwitterCard : this.renderPersonCard
              }
            />
          ))}
        </div>
        {plans && Boolean(plans.length) && (
          <Button
            className={style.corner}
            type="dashed"
            shape="circle"
            onClick={() =>
              this.setState(state => ({
                ...state,
                modalVisible: true,
              }))
            }
          >
            Plan
          </Button>
        )}
        <Modal
          title="EXPLAIN PLAN"
          onCancel={() =>
            this.setState(state => ({
              ...state,
              modalVisible: false,
            }))
          }
          visible={modalVisible}
          footer={false}
          size="small"
        >
          <Table
            size="small"
            rowKey="id"
            pagination={false}
            dataSource={plans}
            columns={PLAN_COLUMNS}
          />
        </Modal>
      </Spin>
    );
  }
}

export default TiSearch;
