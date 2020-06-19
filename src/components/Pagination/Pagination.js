import React from 'react';
import { connect } from 'react-redux';
import PaginationStyle from './Pagination.style';
import { Link } from 'react-router-dom';

const Pagination = (props) => {
    if (!props.news) return null;

    const currentPageId = props.pageId ? parseInt(props.pageId) : 0;
    const previousPageUrl = currentPageId > 1 ? `/${currentPageId - 1}` : `/`;
    const nextPageUrl = `/${currentPageId + 1}`;

    return (
        <PaginationStyle>
            {currentPageId >= 1 ?
                <React.Fragment>
                    <Link className="link" to={previousPageUrl}>Previous</Link>
                    <span className="separator"> | </span>
                </React.Fragment>
                : null}
            <Link className="link" to={nextPageUrl}>Next</Link>
        </PaginationStyle>
    );
}

const mapStateToProps = state => {
    return {
        news: state && state.hits
    };
}
export default connect(mapStateToProps)(Pagination);
