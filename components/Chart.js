import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const Chart = ({ items }) => {
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <View style={styles.container}>
                <Text>No data to display</Text>
            </View>
        );
    }

    const chartData =
    {
        labels: items.map((item) => moment(item.date).format('MM/DD/YYYY')),
        datasets: [
            {
                data: items.filter((item) => item.name === items[0].name).map((item) => item.quantity),
                label: items[0].name,
                color: () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                strokeWidth: 2,
            },
            {
                data: items.filter((item) => item.name === items[1].name).map((item) => item.quantity),
                label: items[1].name,
                color: () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                strokeWidth: 2,
            },
            {
                data: items.filter((item) => item.name === items[2].name).map((item) => item.quantity),
                label: items[2].name,
                color: () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 1)`,
                strokeWidth: 2,
            },
        ]
    };

    console.log(chartData);

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
    };

    return (
        <View style={styles.container}>
            <LineChart
                data={chartData}
                width={ScreenWidth}
                height={300}
                chartConfig={chartConfig}
                withDots={true}
                withInnerLines={true}
                withOuterLines={false}
                bezier
                style={styles.chart}
                contentInset={{ top: 20, bottom: 20 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
    },
});

export default Chart;
