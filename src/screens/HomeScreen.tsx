import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {fetchUsers} from '../api/userApi';

const HomeScreen = () => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  //  queryKey: ['users']
  // A unique identifier for the query.

  // Used internally to cache and track this specific request.

  // Can be a string or an array (array is recommended for flexibility).

  // Multiple queries with the same queryKey share cached data.

  // 📦 Think of it like a key in a dictionary: ['users'] identifies “get all users”.

  //   queryFn: fetchUsers
  // The function that actually performs the API call.

  // This function must return a Promise.

  // useQuery will call this function automatically when the component mounts or refetches.

  if (isLoading) return <ActivityIndicator />;
  if (isError) return <Text>Error: {(error as Error).message}</Text>;

  return (
    <SafeAreaView>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'},
  name: {fontWeight: 'bold'},
});

export default HomeScreen;
