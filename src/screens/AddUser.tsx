// src/screens/HomeScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  Button,
  SafeAreaView,
} from 'react-native';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {addUser, fetchUsers} from '../api/userApi';

const AddUserScreen = () => {
  const queryClient = useQueryClient(); // allows us to invalidate or refetch queries

  // Fetch users
  //   const { data, isLoading, isError, error } = useQuery({
  //     queryKey: ['users'],
  //     queryFn: fetchUsers,
  //   });

  // Mutation to add user
  const mutation = useMutation({
    mutationFn: addUser, //import function (i.e. ----> api call)
    onSuccess: () => {
      // Refetch the user list when a new user is successfully added
      queryClient.invalidateQueries({queryKey: ['users']});
    },
  }); 

  const handleAddUser = () => {
    mutation.mutate({name: 'New User', email: 'new@example.com'});
  };

//   polling vs pooling

  //   if (isLoading) return <ActivityIndicator />;
  //   if (isError) return <Text>Error: {(error as Error).message}</Text>;

  return (
    <SafeAreaView style={{flex: 1}}>
      {/* <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.email}</Text>
          </View>
        )}
      /> */}
      <Button title="Add New User" onPress={handleAddUser} />
      {mutation.isPending && <Text>Adding user...</Text>}
      {mutation.isError && <Text>Error adding user</Text>}
      {mutation.isSuccess && <Text>User added successfully!</Text>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  item: {padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc'},
  name: {fontWeight: 'bold'},
});

export default AddUserScreen;
