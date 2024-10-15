import { FC } from "react";
import { Animated } from "react-native";

interface CartAnimationWrapperProps{
    cartCount: number;
    children: React.ReactNode;
}

const CartAnimationWrapper:FC<CartAnimationWrapperProps> = ({cartCount, children}) => {
    return (
        <Animated.View style={[]}>{children}</Animated.View>
    )
} 