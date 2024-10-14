import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';
import InfiniteScroll from 'react-infinite-scroll-component';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  updateNews = async () => {
    this.props.setProgress(10);
    const { pageSize, country, category, apiKey } = this.props;
    const { page } = this.state;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

    this.setState({ loading: true });

    try {
      let response = await fetch(url);
      if (response.status === 401) {
        throw new Error("Unauthorized: Invalid API key");
      }
      let data = await response.json();
      this.props.setProgress(30);
      this.setState({
        articles: data.articles || [],
        totalResults: data.totalResults,
        loading: false,
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching data: ", error);
      this.setState({ articles: [], loading: false });
      this.props.setProgress(100);
    }
  };

  componentDidMount() {
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    this.updateNews();
  }

  fetchMoreData = async () => {
    const { pageSize, country, category, apiKey } = this.props;
    const { page, articles } = this.state;
    const newPage = page + 1;
    const url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}&page=${newPage}&pageSize=${pageSize}`;

    try {
      let data = await fetch(url);
      let parseData = await data.json();
      this.setState({
        articles: articles.concat(parseData.articles || []),
        totalResults: parseData.totalResults,
        page: newPage,
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  render() {
    const { articles, totalResults, loading } = this.state;
    const { category } = this.props;

    return (
      <div className="container my-3">
        <h1 style={{ textAlign: 'center', margin: '40px 0' }}>
          NewsMonkey - {this.capitalizeFirstLetter(category)} Top Headlines
        </h1>
        {loading && <div>Loading...</div>}
        <InfiniteScroll
          dataLength={articles.length}
          next={this.fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<h4>Loading...</h4>}
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={element.urlToImage || "defaultImageURL"} // Provide a default image URL if needed
                    newsUrl={element.url}
                    author={element.author || "Unknown"}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
}

News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general',
};

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
  setProgress: PropTypes.func.isRequired,
};

export default News;
