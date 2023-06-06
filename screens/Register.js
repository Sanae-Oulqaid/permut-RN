import {
  ActivityIndicator,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomBox from "react-native-customized-box";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Dropdown } from "react-native-element-dropdown";
import axios from "axios";

export default function Register({ navigation }) {
  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getEmail, setEmail] = useState("");
  const [getPassword, setPassword] = useState("");
  const [getEtablissement, setEtablissement] = useState("");
  const [getTelephone, setTelephone] = useState("");
  const [getGrade, setGrade] = useState("");
  const [getSpecialite, setSpecialite] = useState("");
  const [getVillesDesirees, setVillesDesirees] = useState([]);
  const [getVilleActuelle, setVilleActuelle] = useState("");
  const [villesData, setVillesData] = useState([]);
  const [specialitesData, setSpecialitesData] = useState([]);
  const [gradesData, setGradesData] = useState([]);

  const [getError, setError] = useState(false);
  const [throwError, setThrowError] = useState("");
  const [firstError, setFirstError] = useState("");
  const [lastError, setLastError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [EtablissementError, setEtablissementError] = useState("");
  const [TelephoneError, setTelephoneError] = useState("");

  useEffect(() => {
    axios
      .get("https://sleepy-jay-windbreaker.cyclic.app/professeurs")
      .then((response) => {
        villes = Array.from(
          new Set(response.data.map((prof) => prof.villeFaculteActuelle))
        ).map((ville) => {
          return { label: ville, value: ville };
        });
        setVillesData(villes);

        const specialites = Array.from(
          new Set(response.data.map((prof) => prof.specialite))
        ).map((specialite) => {
          return { label: specialite, value: specialite };
        });
        setSpecialitesData(specialites);

        const grades = Array.from(
          new Set(response.data.map((prof) => prof.grade))
        ).map((grade) => {
          return { label: grade, value: grade };
        });
        setGradesData(grades);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const registerFunction = () => {
    setLoading(true);
    if (getFirstName === "") {
      setFirstError("*This field is required*");
    }
    if (getLastName === "") {
      setLastError("*This field is required*");
    }
    if (getEmail === "") {
      setEmailError("*This field is required*");
    }
    if (getPassword === "") {
      setPasswordError("*This field is required*");
    }
    // if (getGrade === "") {
    //   setGradeError("*This field is required*");
    // }

    if (
      getEmail !== "" &&
      getFirstName !== "" &&
      getLastName !== "" &&
      getPassword !== "" &&
      getPassword.length >= 6 &&
      getGrade !== ""
    ) {
      succesfullyCreateAccount();
    } else {
      setError(true);
      setLoading(false);
      setThrowError("Please fill out the Form carefully");
    }
  };

  const succesfullyCreateAccount = () => {
    setLoading(true);
    axios
      .post("https://sleepy-jay-windbreaker.cyclic.app/professeurs", {
        nom: getLastName,
        prenom: getFirstName,
        tel: getTelephone,
        email: getEmail,
        grade: getGrade,
        specialite: getSpecialite,
        faculteActuelle: getEtablissement,
        villeFaculteActuelle: getVilleActuelle,
        villeDesiree: getVillesDesirees.join(";"),
        password: getPassword,
      })
      .then((response) => {
        console.log(response);
        setLoading(false);
        // setEmail("");
        // setPassword("");
        // navigation.replace("Home");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
        setThrowError("Sorry! Registering not successful");
        // setPassword("");
      });
    // firebaseAuth
    //   .createUserWithEmailAndPassword(auth, getEmail, getPassword)
    //   .then((userValue) => {
    //     firebaseAuth.updateProfile(userValue.user, {
    //       displayName: getFirstName,
    //       photoURL:
    //         "https://raw.githubusercontent.com/hirishu10/my-assets/main/react-login-ui/profile.png",
    //     });
    //     try {
    //       const mainCollection = firestore.collection(dbAuth, "user");
    //       const document = firestore.doc(mainCollection, getEmail);
    //       firestore
    //         .setDoc(document, {
    //           userId: getEmail,
    //           firstName: getFirstName,
    //           lastName: getLastName,
    //           emailId: getEmail,
    //         })
    //         .then((u) => {
    //           // alert("Document added in your databases");
    //           //
    //           // This is for the auth database
    //           const authCollection = firestore.collection(dbAuth, "auth");
    //           const authDocument = firestore.doc(authCollection, getEmail);
    //           firestore
    //             .setDoc(authDocument, {
    //               userId: getEmail,
    //               firstName: getFirstName,
    //               lastName: getLastName,
    //               emailId: getEmail,
    //               photoURL:
    //                 "https://raw.githubusercontent.com/hirishu10/my-assets/main/react-login-ui/profile.png",
    //             })
    //             .then((ok) => {
    //               // alert("Auth Added in database");
    //             })
    //             .catch((err) => {
    //               alert("Something went wrong");
    //             });
    //         })
    //         .catch((err) => {
    //           alert("Something went wrong");
    //         });
    //       setEmail("");
    //       setFirstName("");
    //       setLastName("");
    //       setPassword("");
    //       setLoading(false);
    //       navigation.replace("Splash");
    //     } catch (error) {
    //       alert(error);
    //     }
    //   })
    //   .catch((err) => {
    //     setError(true);
    //     setThrowError(
    //       "Sorry! Something went wrong / enter password more than 6 char"
    //     );
    //     setLoading(false);
    //     alert("Something went wrong");
    //     // auth already happen need to be check!
    //   });
  };
  return (
    <View style={{ backgroundColor: "white" }}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{ paddingTop: 20 }}>
        <View style={styles.container}>
          {/* <Image
            style={styles.myLogo}
            source={{
              uri: "https://raw.githubusercontent.com/hirishu10/my-assets/main/top_log.png",
            }}
          /> */}
          {/* <Text style={styles.header}>Create Account for Free!</Text> */}
          <Image
            style={styles.registerImage}
            source={{
              uri: "https://img.lovepik.com/element/45010/0441.png_300.png",
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
                <Text style={{ color: "white", fontWeight: "bold" }}>X</Text>
              </TouchableOpacity>
              <Text style={styles.errorCardText}>{throwError}</Text>
            </View>
          ) : null}

          {/* First Name */}
          <CustomBox
            placeholder={"First Name"}
            boxColor={"#059743"}
            focusColor={"#C70039"}
            boxStyle={{ borderRadius: 10, borderWidth: 1 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 100,
            }}
            labelConfig={{
              text: "First Name",
              style: {
                color: "#059743",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{firstError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getFirstName}
            onChangeText={(value) => {
              setFirstName(value);
              setError(false);
              setFirstError("");
            }}
          />
          {/* Last Name */}
          <CustomBox
            placeholder={"Last Name"}
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
              text: "Last Name",
              style: {
                color: "#059743",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{lastError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getLastName}
            onChangeText={(value) => {
              setLastName(value);
              setError(false);
              setLastError("");
            }}
          />
          {/* Telephone */}
          <CustomBox
            placeholder={"Phone"}
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
              text: "Phone",
              style: {
                color: "#059743",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{TelephoneError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getTelephone}
            onChangeText={(value) => {
              setTelephone(value);
              setError(false);
              setTelephoneError("");
            }}
          />
          {/* Email Id */}
          <CustomBox
            placeholder={"Email"}
            boxColor={"#059743"}
            focusColor={"#C70039"}
            type={"email"}
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
              style: {
                marginBottom: 10,
              },
            }}
            values={getEmail}
            onChangeText={(value) => {
              setEmail(value);
              setError(false);
              setEmailError("");
            }}
          />
          {/* Password */}
          <CustomBox
            placeholder={"Password"}
            boxColor={"#059743"}
            focusColor={"#C70039"}
            boxStyle={{ borderRadius: 10, borderWidth: 1 }}
            inputStyle={{
              fontWeight: "bold",
              color: "#30302e",
              paddingLeft: 20,
              borderRadius: 40,
              overflow: "hidden",
            }}
            labelConfig={{
              text: "Password",
              style: {
                color: "#059743",
                fontWeight: "bold",
              },
            }}
            toggle={true}
            requiredConfig={{
              text: <Text>{passwordError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getPassword}
            onChangeText={(value) => {
              setPassword(value);
              setError(false);
              setPasswordError("");
            }}
          />

          {/* {grade} */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={gradesData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Grade"
            searchPlaceholder="Grade..."
            value={getGrade}
            onChange={(item) => {
              setGrade(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="#059743"
                name="star"
                size={20}
              />
            )}
          />
          {/* Etablissement */}
          <CustomBox
            placeholder={"School"}
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
              text: "School(FST,FS,EST,ENSA...)",
              style: {
                color: "#059743",
                fontWeight: "bold",
              },
            }}
            requiredConfig={{
              text: <Text>{EtablissementError}</Text>,
              style: {
                marginBottom: 10,
              },
            }}
            values={getEtablissement}
            onChangeText={(value) => {
              setEtablissement(value);
              setError(false);
              setEtablissementError("");
              
            }}
            
          />
          {/* {Spécialité} */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={specialitesData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Specialty"
            searchPlaceholder="Specialty..."
            value={getSpecialite}
            onChange={(item) => {
              setSpecialite(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="#059743"
                name="book"
                size={20}
              />
            )}
          />

          

          {/* {ville actuelle} */}
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={villesData}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Current City"
            searchPlaceholder="Current City..."
            value={getVilleActuelle}
            onChange={(item) => {
              setVilleActuelle(item.value);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="#059743"
                name="Safety"
                size={20}
              />
            )}
          />
          {/* {Ville Desirees} */}
          <MultiSelect
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={villesData}
            labelField="label"
            valueField="value"
            placeholder="Desired Cities"
            searchPlaceholder="Desired Cities..."
            value={getVillesDesirees}
            onChange={(items) => {
              setVillesDesirees(items);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color="#059743"
                name="Safety"
                size={20}
              />
            )}
            selectedStyle={styles.selectedStyle}
          />

          
          
          
          
          
          {/* Login Button */}
          <TouchableOpacity
            style={styles.registerbtn}
            onPress={registerFunction}
          >
            <Text style={styles.registerBtnText}>Inscription</Text>
            {loading && loading ? (
              <ActivityIndicator style={styles.indicator} color={"white"} />
            ) : null}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: "#059743",
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  container: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "#059743",
    borderBottomWidth: 0.5,
    width: 300,
    marginBottom: 35,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  container: {
    marginTop: 30,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  errorCard: {
    width: 286,
    height: 50,
    backgroundColor: "#C70039",
    justifyContent: "center",
    paddingLeft: 15,
    borderRadius: 40,
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
  registerImage: {
    marginTop: 20,
    width: 200,
    height: 200,
  },
  myLogo: {
    width: 100,
    height: 70,
    borderRadius: 40,
    left: 150,
    marginBottom: 20,
  },
  header: {
    fontSize: 25,
  },
  registerbtn: {
    marginTop: 10,
    backgroundColor: "#059743",
    width: 150,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    flexDirection: "row",
  },
  registerBtnText: {
    color: "white",
    fontSize: 22,
  },
});
