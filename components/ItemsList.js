import React, { useMemo, useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Pressable } from 'react-native';
import { useDispatch } from 'react-redux';
import { deleteItem } from '../actions/DeleteItem'
import { updateItem } from '../actions/UpdateItem'
import UpdateItemForm from './UpdateItemForm';
import { Swipeable } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getAllItemsByCurrentUser } from '../actions/getItems';
import { onSnapshot, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';


const ItemsList = () => {
  const dispatch = useDispatch();
  const [editingItemId, setEditingItemId] = useState(null);
  const navigation = useNavigation();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getAllItemsByCurrentUser();
      setItems(items);
    };
    fetchItems();

    // subscribe to updates to the items collection
    const unsubscribe = onSnapshot(collection(db, 'items'), () => {
      fetchItems();
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateItem = (id, name, quantity) => {
    const updatedItem = { id, name, quantity };
    const updatedItems = items.map(item => item.id === id ? updatedItem : item);
    dispatch(updateItem(updatedItems));
    setEditingItemId(null);
  };

  const handleDeleteItem = (items) => {
    dispatch(deleteItem(items));
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

      <View style={styles.deleteContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
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

      <View style={styles.updateContainer}>
        <TouchableOpacity style={styles.updateButton} onPress={onPressUpdate}>
          <Text style={styles.updateText}>Edit</Text>
        </TouchableOpacity>
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
            <Text style={styles.itemName}>{item.name}
            </Text>
            <View style={styles.buttonContainer}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'rgb(106, 163, 137)' : 'rgb(106, 163, 137)',
                  },
                  styles.button,
                ]}
                onPress={() => {
                  navigation.navigate('Product Detail', { item });
                }}
              >
                <Text style={styles.buttonText}>Add Entry</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? 'rgb(137, 168, 234)' : 'rgb(137, 168, 234)',
                  },
                  styles.button,
                ]}
                onPress={() => {
                  navigation.navigate('Product Note', { item });
                }}
              >
                <Text style={styles.buttonText}>Add Note</Text>
              </Pressable>
            </View>
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
        extraData={items}
        ListEmptyComponent={<Text style={styles.emptyList}>No items added yet</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FCF3',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#D79578',
    minHeight: 40

  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginLeft: 20,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold'
  },
  emptyList: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 50,
    borderRadius: 10
  },
  deleteContainer: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 10
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  deleteText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateButton: {
    backgroundColor: 'rgb(137, 168, 234)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 2,
  },
  updateText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  updateContainer: {
    backgroundColor: 'rgb(137, 168, 234)',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
    borderRadius: 10
  },
});

export default ItemsList;
