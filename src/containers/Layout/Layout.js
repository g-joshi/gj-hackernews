import React from 'react';
import LayoutStyle from './Layout.style';
import ArticleLists from '../../components/ArticleList/ArticleList';
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
        <ArticleLists pageId={getPageId()} />
        <Pagination pageId={getPageId()} />
        <Separator />
        <LineCharts />
      </LayoutStyle>
    );
}

export default Layout;