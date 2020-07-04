import React from 'react';
import ArticleList from './ArticleList';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import pickBy from 'lodash.pickBy';
import TimeStamp from './Timestamp';

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object,
  };

  getChildContext() {
    return {
      store: this.props.store,
    };
  }

  onStoreChange = () => {
    this.setState(this.appState);
  };

  componentDidMount() {
    this.subscriptionId = this.props.store.subscribe(this.onStoreChange);
    this.props.store.startClock();
  }

  componentWillUnmount() {
    this.props.store.unsubscribe(this.subscriptionId);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.articles !== this.state.articles ||
      nextState.searchTerm !== this.state.searchTerm
    );
  }

  appState = () => {
    const { articles, searchTerm } = this.props.store.getState();
    return { articles, searchTerm };
  };

  state = this.appState();
  render() {
    let { articles, searchTerm } = this.state;

    const searchRE = new RegExp(searchTerm, 'i');
    if (searchTerm) {
      articles = pickBy(articles, (value) => {
        return value.title.match(searchRE) || value.body.match(searchTerm);
      });
    }

    return (
      <div>
        <TimeStamp />
        <SearchBar />
        <ArticleList articles={articles} />
      </div>
    );
  }
}

export default App;
