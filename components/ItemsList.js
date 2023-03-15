import React, { useMemo, useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../actions/DeleteItem'
import { updateItem } from '../actions/UpdateItem'
import UpdateItemForm from './UpdateItemForm';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const ItemsList = () => {
  const items = useSelector(state => state.items);
  const dispatch = useDispatch();
  const [editingItemId, setEditingItemId] = useState(null);
  const navigation = useNavigation();


  const handleUpdateItem = (id, name, quantity) => {
    const updatedItem = { id, name, quantity };
    const updatedItems = items.map(item => item.id === id ? updatedItem : item);
    dispatch(updateItem(updatedItems));
    setEditingItemId(null);
  };

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  const renderRightActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, -20, -100],
    });

    const onPressDelete = () => {
      handleDeleteItem(item.id);
    };

    return (
      <View style={styles.rightActions}>
        <View style={styles.deleteContainer}>
          <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderLeftActions = (progress, dragX, item) => {
    const trans = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
    });

    const onPressUpdate = () => {
      setEditingItemId(item.id);
    };

    return (
      <View style={styles.leftActions}>
        <View style={styles.updateContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={onPressUpdate}>
            <Text style={styles.updateText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = useMemo(() => ({ item }) => {
    if (item.id === editingItemId) {
      return (
        <UpdateItemForm
          itemId={item.id}
          listItems={items} // Pass the items array here
          onCancel={() => setEditingItemId(null)}
          onSubmit={handleUpdateItem}
        />
      );
    } else {
      return (
        <Swipeable
          renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, item)}
          renderLeftActions={(progress, dragX) => renderLeftActions(progress, dragX, item)}
        >
          <View style={styles.item}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? '#8BC34A' : '#00cc66',
                },
                styles.button,
              ]}
              onPress={() => {
                navigation.navigate('ItemDetail', { itemId: item.id, name: item.name });
              }}
            >
              <Text style={styles.buttonText}>Add Entry</Text>
            </Pressable>
          </View>
        </Swipeable>
      );
    }
  }, [editingItemId]);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={(item) => item.id}
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
    backgroundColor: '#E68A00',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#2F4F4F',
    minHeight: 40
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  emptyList: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  deleteContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  updateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateContainer: {
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
});

export default ItemsList;
