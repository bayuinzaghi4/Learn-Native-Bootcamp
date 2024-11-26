import { Text, Image, StyleSheet } from "react-native";
import React, { useCallback } from "react";
import Icon from 'react-native-vector-icons/Feather';
import Button from "./Button";
import { Row, Col } from "./Grid";
import { formatCurrency } from "../utils/formatCurrency";
import { useColorScheme } from "react-native";

export default function OrderList({
  onPress,
  image,
  countdown,
  carName,
  status,
  startDate,
  endDate,
  price,
  style,
  CancelOrder,
  disabled, // Add disabled prop
}) {
  const isDarkMode = useColorScheme() === 'dark';
  const formatIDR = useCallback((price) => formatCurrency.format(price), [])
 // Define the status styles
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Status : canceled':
        return { color: 'red', fontWeight: 'bold' };  // Red color for canceled
      case 'Status : paid':
        return { color: 'green', fontWeight: 'bold' };  // Green color for success
      case 'Status : pending':
        return { color: 'orange', fontWeight: 'bold' };  // Orange color for pending
      default:
        return { color: '#8A8A8A' };  // Default gray for other statuses
    }
  }
  return (
    <Button
      style={{
        backgroundColor: isDarkMode ? "#121212" : "#fff",
        ...styles.card,
        ...style,
        opacity: disabled ? 0.5 : 1, // Reduce opacity when disabled
      }}
      onPress={disabled ? null : onPress} // Prevent action if disabled
      disabled={disabled} // Pass disabled state to Button component
    >
      <Row alignItems={"center"} gap={20}>
        <Col>
          <Image style={styles.img} source={image} />
        </Col>

        <Col>
          <Text
            style={{
              color: isDarkMode ? "#fff" : "#000",
              ...styles.invoice
            }}
          >
            {countdown}
          </Text>
          <Text
            style={{
              color: isDarkMode ? "#fff" : "#000",
              ...styles.carName
            }}
          >
            {carName}
          </Text>
          <Row gap={5}>
            <Col style={styles.textIcon}>
              <Text style={[styles.capacityText, getStatusStyle(status)]}>{status}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={styles.textIcon}>
              <Text style={styles.capacityText}>{startDate}</Text>
            </Col>
          </Row>
          <Row>
            <Col style={styles.textIcon}>
              <Text style={styles.capacityText}>{endDate}</Text>
            </Col>
          </Row>
          <Text style={styles.price}>{formatIDR(price)}</Text>
        </Col>
      </Row>
    </Button>
  );
}

const styles = StyleSheet.create({
  card: {
    shadowColor: "rgba(0,0,0,1)",
    elevation: 2,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 0.5,
    borderRadius: 2,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 12,
    alignItems: 'flex-start',
  },
  img: {
    width: 80,
    height: 80,
    objectFit: "contain",
  },
  carName: {
    fontSize: 15,
  },
  invoice: {
    fontSize: 14,
  },
  capacityText: {
    color: "#8A8A8A",
  },
  price: {
    color: "#5CB85F",
  },
  textIcon: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});