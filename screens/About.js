import React from "react";
import { Text, View, StyleSheet } from "react-native";

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Text style={styles.titleGreen}>Platform for</Text>{" "}
        <Text style={styles.titleRed}>Teacher Exchange</Text>{" "}
        <Text style={styles.titleGreen}>in</Text>{" "}
        <Text style={styles.titleRed}>Universities</Text>
      </Text>
      <Text style={styles.text}>
        This platform is simply a space for university professors to search for a
        partner for an exchange. It is limited to this functionality. Teachers can
        search for partners interested in an exchange at other higher education
        institutions. The system facilitates the search and correspondence between
        teachers who have a mutual desire to exchange.
      </Text>
      <Text style={styles.text}>
        The platform offers a user-friendly and secure interface for teachers to
        communicate and exchange necessary information. Members can create personal
        profiles and provide information about their specialties, institutions, and
        contact details. Teachers can view profiles of potential partners and get
        in touch with them to discuss the details of the exchange agreement.
      </Text>
      <Text style={styles.text}>
        By using this platform, teachers can facilitate their search for exchange
        partners, save time and effort by avoiding individual communications and
        continuous searches for exchange opportunities. This system is efficient
        and useful for teachers who wish to change institutions or work in a new
        institution to broaden their academic experience.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ECFDF5", // Vert clair
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  titleGreen: {
    color: "#064E3B", // Vert clair
  },
  titleRed: {
    color: "#7B341E", // Rouge foncé
  },
  text: {
    marginBottom: 10,
    textAlign: "center",
  },
});

export default About;
