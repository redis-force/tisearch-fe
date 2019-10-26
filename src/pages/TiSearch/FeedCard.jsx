import React from 'react';
import { useTransition, animated } from 'react-spring';
import style from './FeedCard.less';

function FeedCard({ dataSource, renderCard }) {
  const transitions = useTransition(dataSource, data => data.id, {
    from: { opacity: 0, transform: 'translateX(20px)' },
    enter: { opacity: 1, transform: 'translateX(0)' },
    leave: { opacity: 0, transform: 'translateX(-20px)' },
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
