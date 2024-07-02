import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <View style={styles.paginationContainer}>
      {[...Array(totalPages)].map((_, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
          style={[
            styles.paginationButton,
            currentPage === index + 1 && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>{index + 1}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  paginationButton: {
    marginHorizontal: 5,
    backgroundColor: '#523e5a',
    padding: 10,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: '#923e5a',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Pagination;
