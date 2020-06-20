import React from 'react';
import LayoutStyle from './Layout.style';
import ArticleList from '../../components/ArticleList/ArticleList';
import Separator from '../../components/Separator/Separator';
import LineCharts from '../../components/LineCharts/LineCharts';
import Pagination from '../../components/Pagination/Pagination';

const Layout = (props) => {
    const getPageId = () => {
        let pageId;
        try {
            pageId = props.match.params.pageId;
        } catch (error) {
            pageId = null;
        };
        return pageId;
    }
    return (
      <LayoutStyle>
        <ArticleList pageId={getPageId()} />
        <Pagination pageId={getPageId()} />
        <Separator />
        <LineCharts />
      </LayoutStyle>
    );
}

export default Layout;