import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { deleteItem } from '../actions/items';

const ItemsList = ({ items, deleteItem }) => {
    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => console.log(`Pressed on ${item.name}`)}>
            <View style={styles.item}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => deleteItem(item.id)}>
                    <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={items}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                ListEmptyComponent={<Text style={styles.emptyList}>No items added yet</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    itemName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemQuantity: {
        fontSize: 18,
    },
    deleteButton: {
        color: 'red',
        fontWeight: 'bold',
    },
    emptyList: {
        textAlign: 'center',
        fontSize: 18,
        paddingVertical: 20,
    },
});

const mapStateToProps = (state) => ({
    items: state.items,
});

const mapDispatchToProps = {
    deleteItem,
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsList);
