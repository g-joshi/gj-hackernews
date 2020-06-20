import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PaginationStyle from './Pagination.style';

const Pagination = (props) => {
    if (!props.news) return null;

    const currentPageId = props.pageId ? parseInt(props.pageId) : 0;
    const previousPageUrl = currentPageId > 1 ? `/${currentPageId - 1}` : `/`;
    const nextPageUrl = `/${currentPageId + 1}`;

    return (
      <PaginationStyle>
        {currentPageId >= 1 ? (
          <>
            <Link className="link" to={previousPageUrl}>Previous</Link>
            <span className="separator"> | </span>
          </>
              )
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
