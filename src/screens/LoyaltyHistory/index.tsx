import React, { useState, useEffect } from "react";
import { SafeAreaView, View, Text, Image, ScrollView } from "react-native";
import styles from "./loyaltyHistory.style";
import colors from "../../utils/colors";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Divider, DataTable } from "react-native-paper";
import moment from "moment";
import {
  useGetCustomerPointsHistoryQuery,
  useLazyGetUserQuery,
} from "../Login/login.api";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { getStorageData } from "../../service/asyncStorage";
import { setUser } from "../Login/login.slice";

const optionsPerPage = [2, 3, 4];

const LoyaltyHistory = () => {
  const dispatch = useAppDispatch();
  const navigation: any = useNavigation();
  const [page, setPage] = React.useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState(optionsPerPage[0]);
  const [getUser, { isLoading }] = useLazyGetUserQuery();
  const [userToken, setUserToken] = useState();
  const { user } = useAppSelector((state) => state.login);
  const { data, isLoading: historyLoading } = useGetCustomerPointsHistoryQuery(
    user?.PhoneNumber,
    {
      skip: !user.PhoneNumber,
    }
  );

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  useEffect(() => {
    try {
      getStorageData("token").then((response: any) => {
        setUserToken(response);
      });
    } catch {}
  }, []);

  React.useEffect(() => {
    if (!user.Id && !userToken) {
      getUser("")
        .unwrap()
        .then((result) => {
          const data = {
            Id: result.data.id,
            Points: result.data.points,
            FirstName: result.data.firstName,
            LastName: result.data.lastName,
          };
          dispatch(setUser(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user, getUser, dispatch]);

  return (
    <>
      <SafeAreaView style={styles.SafeAreaView}>
        <View style={styles.container}>
          <View style={styles.headerWrapper}>
            <Icon
              name="close-outline"
              color={colors.primaryColor}
              size={25}
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.title}>Loyalty History</Text>
          </View>
        </View>
        <Divider style={styles.divide} />
        <ScrollView>
          <View style={styles.loyaltyWrapper}>
            <View style={styles.loyaltyCardWrapper}>
              <View style={styles.innerWrapper}>
                <Image source={require("../../assets/images/badge.png")} />
                <Text style={styles.name}>Customer ID</Text>
                <Text style={styles.nameText}>
                  {user?.Id ? user.Id : "CUST-00001"}
                </Text>
              </View>
              <View style={styles.difference} />
              <View style={styles.innerWrapper}>
                <Image source={require("../../assets/images/man-23.png")} />
                <Text style={styles.name}>Customer Name</Text>
                <Text style={styles.nameText}>
                  {user?.FirstName ? user.FirstName : "Haider S"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.loyaltyWrapper}>
            <View style={styles.loyaltyCardWrapper}>
              <View style={styles.innerWrapper}>
                <Image source={require("../../assets/images/wallet-43.png")} />
                <Text style={styles.name}>Value</Text>
                <Text style={styles.nameText}>
                  {user?.TotalSpent
                    ? Number(user.TotalSpent).toFixed(2)
                    : "1,000" + "Rs"}
                </Text>
              </View>
              <View style={styles.difference} />
              <View style={styles.innerWrapper}>
                <Image
                  source={require("../../assets/images/military-medal.png")}
                />
                <Text style={styles.name}>Points</Text>
                <Text style={styles.nameText}>
                  {user?.Points ? Number(user.Points).toFixed(2) : "25,000"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.general}>
            <DataTable style={styles.tableWrapper}>
              <DataTable.Header style={styles.tableHeader}>
                <DataTable.Title>Date</DataTable.Title>
                <DataTable.Title>Time</DataTable.Title>
                <DataTable.Title>Order ID</DataTable.Title>
                <DataTable.Title>Points</DataTable.Title>
              </DataTable.Header>
              {data?.data.map((item: any) => (
                <DataTable.Row>
                  <DataTable.Cell>
                    {moment(item.creationTime).format("DD-MM-YYYY")}
                  </DataTable.Cell>
                  <DataTable.Cell>
                    {moment(item.creationTime).format("H:MM a")}
                  </DataTable.Cell>
                  <DataTable.Cell>{item.orderId}</DataTable.Cell>
                  <DataTable.Cell>{item.points}</DataTable.Cell>
                </DataTable.Row>
              ))}
            </DataTable>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default LoyaltyHistory;
