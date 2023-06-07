import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CustomBox from "react-native-customized-box";
import axios from "axios";

export default function Login({ navigation, setUser }) {
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [getDisabled, setDisabled] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  //
  const loginFunction = () => {
    setDisabled(true);
    setLoading(true);
    if (getEmail === "") {
      setEmailError("*This field is required*");
    }
    if (getPassword === "") {
      setPasswordError("*This field is required*");
    }
    if (getEmail !== "" && getPassword !== "") {
      axios
        .post("https://tiny-worm-nightgown.cyclic.app/login", {
          email: getEmail,
          password: getPassword,
        })
        .then((response) => {
          console.log(response);
          axios
            .get("https://tiny-worm-nightgown.cyclic.app/professeurs")
            .then((response) => {
              console.log(response.data);
              const user = response.data.filter(
                (user) => user.email === getEmail
              );
              setUser(user[0]);
              console.log(user[0]);
            })
            .catch((error) => {
              console.log(error);
            });
          setEmail("");
          setPassword("");
          navigation.replace("App");
        })
        .catch((error) => {
          console.log(error);
          setDisabled(false);
          setLoading(false);
          setError(true);
          setThrowError(
            "User not found or Incorrect password"
          );
          setPassword("");
        });
    } else {
      setDisabled(false);
      setLoading(false);
      setError(true);
      setThrowError("Please make sure to enter your email address and password carefully");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* <Image
        style={styles.myLogo}
        source={{
          uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png",
        }}
      /> */}
      {/* <Text style={styles.header}>react-native-login-register-ui</Text> */}
      <Image
        style={styles.loginImage}
        source={{
          uri: "https://previews.123rf.com/images/rudzhan/rudzhan2208/rudzhan220800685/193062660-la-femme-a-oubli%C3%A9-le-mot-de-passe.jpg",
        }}
      />
      {getError ? (
        <View style={styles.errorCard}>
          <TouchableOpacity
            style={styles.cross}
            onPress={() => {
              setError(false);
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>x</Text>
          </TouchableOpacity>
          <Text style={styles.errorCardText}>{throwError}</Text>
        </View>
      ) : null}
      <CustomBox
        placeholder={"Enter your Email"}
        boxColor={"#059743"}
        focusColor={"#C70039"}
        keyboardType="email-address"
        boxStyle={{ borderRadius: 10, borderWidth: 1 }}
        inputStyle={{
          fontWeight: "bold",
          color: "#30302e",
          paddingLeft: 20,
          borderRadius: 40,
        }}
        labelConfig={{
          text: "Email",
          style: {
            color: "#059743",
            fontWeight: "bold",
          },
        }}
        requiredConfig={{
          text: <Text>{emailError}</Text>,
        }}
        values={getEmail}
        onChangeText={(value) => {
          setEmail(value);
          setError(false);
          setEmailError("");
        }}
      />
      <CustomBox
        placeholder={"Enter your Password"}
        toggle={true}
        boxColor={"#059743"}
        focusColor={"#C70039"}
        boxStyle={{ borderRadius: 10, borderWidth: 1 }}
        inputStyle={{
          fontWeight: "bold",
          color: "#30302e",
          paddingLeft: 20,
          borderRadius: 40,
        }}
        labelConfig={{
          text: "Password",
          style: {
            color: "#059743",
            fontWeight: "bold",
          },
        }}
        requiredConfig={{
          text: <Text>{passwordError}</Text>,
        }}
        values={getPassword}
        onChangeText={(value) => {
          setPassword(value);
          setError(false);
          setPasswordError("");
        }}
      />

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={loginFunction}
        disabled={getDisabled}
      >
        <Text style={styles.loginBtnText}>Sign in</Text>
        {loading && loading ? (
          <ActivityIndicator style={styles.indicator} color={"white"} />
        ) : null}
      </TouchableOpacity>

      {/* Register Button */}
      <View style={styles.createAccount}>
        <Text style={styles.createAccountText}>
          {`Do not have an account? `}
        </Text>
        <TouchableOpacity
          style={styles.registerBtn}
          onPress={() => {
            navigation.navigate("Register");
          }}
        >
          <Text style={styles.registerBtnText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  errorCard: {
    width: 285,
    height: 50,
    backgroundColor: "#C70039",
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 10,
  },
  errorCardText: {
    paddingLeft: 15,
    color: "white",
    fontSize: 12,
    fontWeight: "500",
    position: "absolute",
  },
  cross: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -40,
    left: 250,
    position: "relative",
  },
  loginImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 25,
  },
  loginBtn: {
    marginTop: 10,
    backgroundColor: "#059743",
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loginBtnText: {
    color: "white",
    fontSize: 22,
  },
  forgotBtn: {
    marginTop: -20,
    width: 280,
    height: 20,
    justifyContent: "center",
  },
  forgotBtnText: {
    color: "#c29700",
    fontSize: 12,
    alignSelf: "flex-end",
    textDecorationLine: "underline",
  },
  createAccount: {
    marginTop: 10,
    width: 280,
    height: 20,
    flexDirection: "row",
  },
  createAccountText: {
    color: "grey",
  },
  registerBtn: {},
  registerBtnText: {
    color: "#e65c40",
    textDecorationLine: "underline",
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    top: 10,
    marginBottom: 10,
  },
});
