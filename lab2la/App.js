import React from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import * as rssParser from 'react-native-rss-parser';
import axios from 'axios';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: []
        };

        this.getNews = this.getNews.bind(this);
        this.getNewsToRender = this.getNewsToRender.bind(this);
    }

    async componentDidMount() {
        await this.getNews();
    }

    getNewsToRender(data) {
        return data.map(item => (
            <View key={item.id}>
                <Text style={{marginBottom: 20, marginTop: 20, fontWeight: `bold`}}>{item.title}</Text>
                <Text className={`description`}>{item.description}</Text>
            </View>
        ))
    }

    async getNews() {
        const response = await axios.get('http://www.nasa.gov/rss/dyn/breaking_news.rss');
        const res = await rssParser.parse(response.data);
        this.setState({ news: res.items });
    }

    render() {
        const content = this.getNewsToRender(this.state.news);
        return (
            <ScrollView style={styles.container}>
                {content}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },

});
