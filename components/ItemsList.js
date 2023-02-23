import React from 'react';
import { StyleSheet, View, Text, FlatList, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItemAsync, updateItemAsync } from '../actions/items';
import UpdateItemForm from './UpdateItemForm';
import DeleteItemForm from './DeleteItemForm';

const ItemsList = () => {
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();
  const [editingItemId, setEditingItemId] = React.useState(null);

  const renderItem = ({ item }) => {
    if (item.id === editingItemId) {
      return (
        <UpdateItemForm
          itemId={item.id}
          onCancel={() => setEditingItemId(null)}
        />
      );
    } else {
      return (
        <View style={styles.item}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <View style={{ flexDirection: 'row' }}>
            <DeleteItemForm id={item.id} />
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? 'lightgray' : 'white',
                },
                styles.button,
              ]}
              onPress={() => {
                setEditingItemId(item.id);
              }}
            >
              <Text style={styles.buttonText}>Update</Text>
            </Pressable>
          </View>
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        data={items}
        renderItem={renderItem}
        extraData={items} // Add this line to force re-render on state change
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
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginLeft: 10,
  },
  buttonText: {
    fontSize: 16,
  },
  emptyList: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default ItemsList;
