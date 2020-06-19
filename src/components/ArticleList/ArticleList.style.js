import styled from 'styled-components';

const ArticleStyle = styled.div`
button {
    background: none;
    border: 0;
    outline: none;
    padding: 0;
    cursor: pointer;
}

button:hover {
    text-decoration: underline;
    color: blue;
}

.row-header .row .col {
    background-color: rgb(255, 115, 46);
}

.col {
    padding: 10px;
    font-size: 1rem;
    text-align: left;
}
.row-header .col {
    color: white;
}

.row-body .col {
    color: black;
}

.row-body .row:nth-of-type(2n+1) {
    background-color: rgb(229, 230, 224);
}

.row-body .row:nth-of-type(2n) {
    background-color: rgb(246, 246, 239);
}


/* MOBILE */
@media only screen and (min-width: 320px){
    .row-header {
        display: none;
    }
    .label-inline {
        font-weight: bold;
    }
    .row {
        display: flex;
        flex-flow: column;
        margin: 15px;
    }
    .col {
        display: flex;
    }
    .label-inline {
        flex: 1
    }
    .value {
        flex: 2;
    }
    .news-details, 
    .news-details .label-inline, 
    .news-details .value,
    .news-details .value .title,
    .news-details .value .url,
    .news-details .value .hide-btn {
        display: block;
    }
    .news-details .value .url {
        word-break: break-word;
    }
}

/* DESKTOP */
@media only screen and (min-width: 1024px) {
    .col {justify-content: center;}
    .col-1 {width: 8%; flex-shrink: 0;}
    .col-2 {width: 8%; flex-shrink: 0;}
    .col-3 {width: 8%; flex-shrink: 0;}
    .col-4 {width: 76%;}

    .row-header {
        display: block;
    }

    .label-inline {
        display: none;
    }

    .value {
        flex: 0;
    }

    .row {
        margin: 0;
        display: flex;
        flex-flow: row;
        align-items: center;
    }

    .news-details .label-inline {
        display: none;
    }

    .news-details .value,
    .news-details .value .title,
    .news-details .value .url,
    .news-details .value .hide-btn {
        display: inline;
    }
}
`;

export default ArticleStyle;