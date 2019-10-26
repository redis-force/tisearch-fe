import React from 'react';
import { useTransition, animated } from 'react-spring';
import style from './FeedCard.less';

function FeedCard({ dataSource, renderCard }) {
  const transitions = useTransition(dataSource, data => data.id, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props} className={style.anicard}>
          {renderCard(dataSource)}
        </animated.div>
      ),
  );
}

export default FeedCard;
