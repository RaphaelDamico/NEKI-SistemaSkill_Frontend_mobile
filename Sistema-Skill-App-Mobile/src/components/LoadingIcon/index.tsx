import { Animated, Easing } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useEffect, useRef } from "react";


export default function LoadingIcon() {
    const spinValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
    }, [spinValue]);

    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }}>
            <AntDesign
                name="loading1"
                size={24} color="#F9F9F9" />
        </Animated.View>
    );
};