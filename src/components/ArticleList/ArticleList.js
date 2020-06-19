import React, { Component } from 'react';
import { connect } from 'react-redux';
import ArticleListStyle from './ArticleList.style';
import { getNewsAction, hideNewsAction, upvoteNewsAction } from '../../store/actions/newsActions';
import { formatDistance } from 'date-fns'

export class ArticleList extends Component {
    componentDidMount() {
        // this.props.getNews({ pageId: this.props.pageId });
    }

    componentDidUpdate(nextProps) {
        if (this.props && (this.props.pageId !== nextProps.pageId)) {
            this.props.getNews({ pageId: this.props.pageId });
        }
    }
    render() {
        if (!this.props.news || this.props.news.length <= 0) return (<p>loading...</p>);

        return (
            <ArticleListStyle>
                <div className="container">
                    <div className="row-container row-header">
                        <div className="row">
                            <div className="col col-1">Comments</div>
                            <div className="col col-2">Vote Count</div>
                            <div className="col col-3">Up Vote</div>
                            <div className="col col-4">News Details</div>
                        </div>
                    </div>
                    <div className="row-body">
                        {
                            this.props.news.map(news => {
                                return !news.isHidden ? (
                                    <div key={news.objectID} className="row">
                                        <div className="col col-1">
                                            <span className="label-inline">Comments:</span>
                                            <span className="value">{news.num_comments}</span>
                                        </div>
                                        <div className="col col-2">
                                            <span className="label-inline">Vote Count:</span>
                                            <span className="value">{news.points}</span>
                                        </div>
                                        <div className="col col-3">
                                            <span className="label-inline">Up Vote:</span>
                                            <span className="value">
                                                <button className="upvote-btn" onClick={_ => this.props.upvoteNews(this.props.news, news)}>∆</button>
                                            </span>
                                        </div>
                                        <div className="col news-details col-4">
                                            <span className="label-inline">News Details:</span>
                                            <span className="value">
                                                <span className="title">{news.title} </span>
                                                <a href={news.url} className="url">({news.url})</a>
                                                <span> by </span>
                                                <span>{news.author}</span>
                                                <span> {formatDistance(new Date(news.created_at), new Date())} </span>
                                                <button className="hide-btn" onClick={_ => this.props.hideNews(this.props.news, news)}>[hide]</button>
                                            </span>
                                        </div>
                                    </div>
                                ) : null;
                            })
                        }
                    </div>
                </div>
            </ArticleListStyle>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        news: state && state.hits
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getNews: (pageId) => dispatch(getNewsAction(pageId)),
        hideNews: (newsList, newsItem) => dispatch(hideNewsAction({ newsList, newsItem })),
        upvoteNews: (newsList, newsItem) => dispatch(upvoteNewsAction({ newsList, newsItem }))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);