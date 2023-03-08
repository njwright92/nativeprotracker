import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { formatChartData } from '../data/formattedData.js';
import Chart from '../components/Chart';

const ChartScreen = () => {
    const [items, setItems] = useState([]);

    const allItems = useSelector((state) => state.items);

    useEffect(() => {
        setItems(allItems);
    }, [allItems]);

    console.log(formatChartData(items)); // log the formatted items

    return (
        <View style={styles.container}>
            <Chart title="Quantity over time" items={formatChartData(items)} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        paddingTop: 22,
    },
});

export default ChartScreen;
