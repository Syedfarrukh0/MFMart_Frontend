import { useCartStore } from "@state/cartStore";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

const withCart = <P extends object>(WrappedComponent: React.ComponentType<P>):FC<P> => {
    const WithCartComponent: FC<P> = (props) => {
        const cart = useCartStore(state => state.cart)
        const cartCount = cart.reduce((acc, item) => acc + item.count, 0)
        return (
            <View style={styles.container}>
                <WrappedComponent {...props} />
            </View>
        )
    }

    return WithCartComponent;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})

export default withCart;