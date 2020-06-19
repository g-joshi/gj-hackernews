import React from 'react';
import { connect } from 'react-redux';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import LineChartsStyle from './LineCharts.style';

const LineCharts = (props) => {
    if (!props.news || props.news.length <= 0) return (<p>loading...</p>);

    const data = props.news.map(news => {
        return {
            name: news.objectID,
            uv: news.points
        }
    });

    return (
        <LineChartsStyle>
            <ResponsiveContainer aspect={3}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis dataKey="uv" />
                    <Tooltip />
                    <Line
                        connectNulls={true}
                        dataKey="uv"
                        stroke="#8884d8"
                        fill="#8884d8"
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </LineChartsStyle>
    );
}

const mapStateToProps = (state) => {
    return {
        news: state && state.hits
    }
}

export default connect(mapStateToProps)(LineCharts);
