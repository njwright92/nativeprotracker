import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { Ionicons } from "@expo/vector-icons";
import {
  collectionGroup,
  where,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import moment from "moment";
import { db } from "../firebaseConfig";
import { getAuth } from "firebase/auth";
import { CSVLink } from "react-csv";

const LineChartScreen = ({ route }) => {
  const { itemId, name } = route.params;
  const navigation = useNavigation();
  const [weeklyEntries, setWeeklyEntries] = useState([]);
  const [monthlyEntries, setMonthlyEntries] = useState([]);
  const [yearlyEntries, setYearlyEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const currentUser = auth.currentUser;

  const csvWeeklyData = weeklyEntries.map((entry) => ({
    Date: moment(entry.date.toDate()).format("MM/DD/YYYY"),
    Quantity: entry.quantity,
  }));

  const csvMonthlyData = monthlyEntries.map((entry) => ({
    Date: moment(entry.date.toDate()).format("MM/DD/YYYY"),
    Quantity: entry.quantity,
  }));

  const csvYearlyData = yearlyEntries.map((entry) => ({
    Date: moment(entry.date.toDate()).format("MM/DD/YYYY"),
    Quantity: entry.quantity,
  }));

  const sanitizeQuantity = (entry) => {
    return {
      ...entry,
      quantity: Number(entry.quantity.replace(/[^0-9]/g, "")),
    };
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entriesQuery = query(
          collectionGroup(db, "entries"),
          where("uid", "==", currentUser.uid),
          where("itemId", "==", itemId),
          orderBy("date", "desc")
        );
        const entriesSnapshot = await getDocs(entriesQuery);
        const entries = entriesSnapshot.docs.map((doc) => doc.data());
        const weekly = entries.slice(-7).map(sanitizeQuantity);
        const monthly = entries.slice(-30).map(sanitizeQuantity);
        const yearly = entries.slice(-270).map(sanitizeQuantity);
        setWeeklyEntries(weekly);
        setMonthlyEntries(monthly);
        setYearlyEntries(yearly);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEntries();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Loading.....</Text>
      </View>
    );
  }

  if (!Array.isArray(weeklyEntries) || weeklyEntries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No data to display.</Text>
      </View>
    );
  }
  if (!Array.isArray(monthlyEntries) || monthlyEntries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No data to display.</Text>
      </View>
    );
  }
  if (!Array.isArray(yearlyEntries) || yearlyEntries.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No data to display.</Text>
      </View>
    );
  }

  const weeklyData = {
    labels: weeklyEntries
      .map((entry) => moment(entry.date.toDate()).format("MM/DD"))
      .reverse(),
    datasets: [
      {
        data: weeklyEntries.map((entry) => Number(entry.quantity)).reverse(),
        color: () => `rgba(204, 127, 44, 1)`,
        strokeWidth: 2,
      },
    ],
  };

  const monthlyData = {
    labels: monthlyEntries
      .map((entry) => moment(entry.date.toDate()).format("MM/DD"))
      .reverse(),
    datasets: [
      {
        data: monthlyEntries.map((entry) => Number(entry.quantity)).reverse(),
        color: () => `rgba(204, 127, 44, 1)`,
        strokeWidth: 2,
      },
    ],
  };

  const yearlyData = {
    labels: yearlyEntries
      .map((entry) => moment(entry.date.toDate()).format("MM/DD"))
      .reverse(),
    datasets: [
      {
        data: yearlyEntries.map((entry) => Number(entry.quantity)).reverse(),
        color: () => `rgba(204, 127, 44, 1)`,
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView style={styles.scrollContent}>
      <TouchableOpacity
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? "black" : "black",
            borderRadius: 20,
            padding: 16,
            width: "85%",
            marginTop: 10,
            alignSelf: "flex-start",
          },
        ]}
        onPress={() => navigation.goBack()}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Ionicons name="chevron-back" size={24} color="black" />
          <Text style={{ color: "black", fontWeight: "bold", fontSize: 18 }}>
            Back
          </Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>{name}</Text>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          color: "black",
          marginTop: 5,
        }}
      >
        Weekly
      </Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 0.25, paddingHorizontal: 8 }}>
          <CSVLink data={csvWeeklyData} filename={"weekly_data.csv"}>
            <Pressable>
              {({ pressed }) => (
                <View
                  style={{
                    backgroundColor: pressed ? "#F9FCF3" : "#F9FCF3",
                    borderWidth: 2,
                    borderColor: "#D79578",
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                  }}
                >
                  <Ionicons name="md-cloud-download" size={16} color="black" />
                  <Text style={{ color: "black", textAlign: "center" }}>
                    Download CSV
                  </Text>
                </View>
              )}
            </Pressable>
          </CSVLink>
        </View>
      </View>

      <LineChart
        data={weeklyData}
        width={ScreenWidth}
        height={275}
        chartConfig={{
          backgroundColor: "#F9FCF3",
          backgroundGradientFrom: "#F9FCF3",
          backgroundGradientTo: "#F9FCF3",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          yAxisLabel: "Quantity",
          xAxisLabel: "Date",
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
        withInnerLines={true}
        withOuterLines={false}
        fromZero={true}
        contentInset={{ top: 20, bottom: 20 }}
        withVerticalLabels={true}
        withHorizontalLabels={true}
      />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          color: "black",
        }}
      >
        Monthly
      </Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 0.25, paddingHorizontal: 8 }}>
          <CSVLink data={csvMonthlyData} filename={"monthly_data.csv"}>
            <Pressable>
              {({ pressed }) => (
                <View
                  style={{
                    backgroundColor: pressed ? "#F9FCF3" : "#F9FCF3",
                    borderWidth: 2,
                    borderColor: "#D79578",
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                  }}
                >
                  <Ionicons name="md-cloud-download" size={16} color="black" />
                  <Text style={{ color: "black", textAlign: "center" }}>
                    Download CSV
                  </Text>
                </View>
              )}
            </Pressable>
          </CSVLink>
        </View>
      </View>
      <LineChart
        data={monthlyData}
        width={ScreenWidth}
        height={275}
        chartConfig={{
          backgroundColor: "#F9FCF3",
          backgroundGradientFrom: "#F9FCF3",
          backgroundGradientTo: "#F9FCF3",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          yAxisLabel: "Quantity",
          xAxisLabel: "Date",
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
        withInnerLines={true}
        withOuterLines={true}
        fromZero={true}
        contentInset={{ top: 20, bottom: 20 }}
        withVerticalLabels={true}
        withHorizontalLabels={true}
      />

      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
          color: "black",
        }}
      >
        Yearly
      </Text>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ flex: 0.25, paddingHorizontal: 8 }}>
          <CSVLink data={csvYearlyData} filename={"yearly_data.csv"}>
            <Pressable>
              {({ pressed }) => (
                <View
                  style={{
                    backgroundColor: pressed ? "#F9FCF3" : "#F9FCF3",
                    borderWidth: 2,
                    borderColor: "#D79578",
                    borderRadius: 10,
                    flexDirection: "row",
                    alignItems: "center",
                    shadowColor: "rgba(0, 0, 0, 0.5)",
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 2,
                  }}
                >
                  <Ionicons name="md-cloud-download" size={16} color="black" />
                  <Text style={{ color: "black", textAlign: "center" }}>
                    Download CSV
                  </Text>
                </View>
              )}
            </Pressable>
          </CSVLink>
        </View>
      </View>
      <LineChart
        data={yearlyData}
        width={ScreenWidth}
        height={275}
        chartConfig={{
          backgroundColor: "#F9FCF3",
          backgroundGradientFrom: "#F9FCF3",
          backgroundGradientTo: "#F9FCF3",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          yAxisLabel: "Quantity",
          xAxisLabel: "Date",
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 10,
        }}
        withInnerLines={true}
        withOuterLines={true}
        fromZero={true}
        contentInset={{ top: 20, bottom: 20 }}
        withVerticalLabels={true}
        withHorizontalLabels={true}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    backgroundColor: "#E5BA95",
    padding: 1,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "black",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
  },
});

export default LineChartScreen;
