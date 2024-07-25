import  { useState } from 'react';
import PropTypes from 'prop-types';

import styles from './Tags.module.css'; 
import { useNavigate } from 'react-router-dom';

const Tags = ({ tags }) => {

  const navigate = useNavigate();

  const [visibleCount, setVisibleCount] = useState(8);

  const TagsVisibility = () => {
    if (visibleCount < tags.length) {
      setVisibleCount(prev => prev + 8); 
    } else {
      setVisibleCount(5); 
    }
  };

  if (!tags || tags.length === 0) {
    return null;
  }
  const handleTagClick = (tag) => {
    navigate(`/search?q=${tag}`);
  };

  return (
    <div>
      <div className={styles.tags} style={{ flexWrap: tags.length > 4 ? 'wrap' : 'nowrap' }}>
        {tags.slice(0, visibleCount).map((tag, index) => (
          <p key={index} onClick={() => handleTagClick(tag)}>
            <span>#</span>{tag}
          </p>
        ))}
      </div>
      {tags.length > 5 && (
        <button onClick={TagsVisibility} className={styles.btn_tags}>
          {visibleCount < tags.length ? 'Ver mais tags' : 'Ver menos'}
        </button>
      )}
    </div>
  );
};

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Tags;