import React, { useRef } from 'react';
import { TouchableOpacity, Text, Animated, View } from 'react-native';

const CustomButton = ({ title, onPress }) => {
    const bounceValue = useRef(new Animated.Value(0)).current;

    const handlePress = () => {
        Animated.sequence([
            Animated.timing(bounceValue, { toValue: -10, duration: 100 }),
            Animated.timing(bounceValue, { toValue: 0, duration: 100 }),
        ]).start(() => {
            // Execute the onPress function after the bounce animation
            onPress();
        });
    };

    return (
        <View style={{ width: '25%' }}>
            <TouchableOpacity
                style={{
                    paddingVertical: 16,
                    paddingHorizontal: 32,
                    borderWidth: 2,
                    borderColor: '#6AA389',
                    borderRadius: 16,
                    backgroundColor: '#CDE8E8',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: [{ translateY: bounceValue }],
                }}
                onPress={handlePress}
            >
                <Text
                    style={{
                        fontSize: 24,
                        color: '#6AA389',
                        fontWeight: '700',
                        textTransform: 'uppercase',
                    }}
                >
                    Products
                </Text>
                <Animated.View
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: '#96E8C3',
                        borderRadius: 16,
                        shadowColor: '#79BA9C',
                        shadowOffset: {
                            width: 0,
                            height: 12,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 0,
                    }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default CustomButton;
