// PDFDocument.js
import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import moment from 'moment';

const PDFDocument = ({ data }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{data.title}</Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Date</Text>
            <Text style={styles.tableHeader}>Quantity</Text>
          </View>
          {data.data.map((entry) => (
            <View style={styles.tableRow} key={entry.date}>
              <Text style={styles.tableCell}>
              {moment(entry.date.toDate()).format('MM/DD/YYYY')}
              </Text>
              <Text style={styles.tableCell}>{entry.quantity}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  table: {
    display: 'table',
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: 5,
    fontSize: 12,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    padding: 5,
    fontSize: 12,
    flex: 1,
    textAlign: 'center',
  },
});

export default PDFDocument;
