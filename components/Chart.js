import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';


const Chart = ({ title, items }) => {
    if (!Array.isArray(items) || items.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>{title}</Text>
                <Text>No data to display</Text>
            </View>
        );
    }

    const chartData = {
        labels: items.map((item) => item.date),
        datasets: [
            {
                data: items.map((item) => item.quantity),
                label: 'Quantity',
                color: () => `rgba(0, 0, 0, 1)`,
                strokeWidth: 2,
            },
        ],
    };

    console.log(chartData); // log the chartData object

    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <LineChart
                data={chartData}
                width={350}
                height={300}
                chartConfig={chartConfig}
                withDots={true}
                withInnerLines={false}
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
