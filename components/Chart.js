import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet } from 'react-native';

const Chart = ({ data, title }) => {
    const chartConfig = {
        backgroundGradientFrom: '#fff',
        backgroundGradientTo: '#fff',
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 2,
    };

    if (!data?.labels || !data?.datasets?.length) {
        return null; // or show an error message or default chart
    }


    if (!chartData.labels.length || !chartData.datasets[0].data.length) {
        return null; // or show an error message or default chart
    }

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
