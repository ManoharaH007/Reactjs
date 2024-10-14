import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NewsItem extends Component {
  render() {
    const { title, description, imageUrl, newsUrl, author, date, source } = this.props;

    // Default values
    const displayAuthor = author || 'unknown';
    const formattedDate = date ? new Date(date).toGMTString() : 'Date not available';

    return (
      <div className="my-4">
        <div className="card" style={{ position: 'relative' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              position: 'absolute',
              right: '0',
              top: '0',
              margin: '10px',
            }}
          >
            <span className="rounded-pill bg-danger text-white px-2 py-1" >{source}</span> 
          </div>
          <img src={imageUrl} className="card-img-top" alt={title || 'News image'} />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text">
              <small className="text-body-secondary">
                By {displayAuthor} on {formattedDate}
              </small>
            </p>
            <a
              href={newsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-dark"
            >
             Explore
            </a>
          </div>
        </div>
      </div>
    );
  }
}


NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  imageUrl: PropTypes.string.isRequired,
  newsUrl: PropTypes.string.isRequired,
  author: PropTypes.string,
  date: PropTypes.string,
  source: PropTypes.string.isRequired,
};

export default NewsItem;
