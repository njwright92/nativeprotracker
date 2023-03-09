import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
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
            <View style={styles.card}>
                <Text style={styles.title}>Quantity over time</Text>
                <Chart items={formatChartData(items)} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FF9966',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'white',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
        color: 'black',
    },
    card: {
        backgroundColor: '#778899',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default ChartScreen;
