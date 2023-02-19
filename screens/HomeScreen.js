import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, View, Text } from 'react-native';

const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            data: [50, 10, 150, 80, 120, 70],
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // optional
            strokeWidth: 2 // optional
        }
    ]
};

const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2 // optional, default 3
};

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Products, Tracking, charts, and snapshot report</Text>
            <LineChart
                data={data}
                width={300}
                height={200}
                chartConfig={chartConfig}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00008B',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white'
    }
});

export default HomeScreen;
