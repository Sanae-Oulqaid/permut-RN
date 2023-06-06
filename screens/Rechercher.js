import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Dropdown, MultiSelect } from "react-native-element-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Rechercher() {
  const [initialSpecialite, setInitialSpecialite] = useState(null);
  const [initialVilleActuelle, setInitialVilleActuelle] = useState(null);
  const [initialVilleDesiree, setInitialVilleDesiree] = useState(null);
  const [selectedSpecialite, setSelectedSpecialite] = useState(null);
  const [selectedVilleActuelle, setSelectedVilleActuelle] = useState(null);
  const [selectedVilleDesiree, setSelectedVilleDesiree] = useState(null);
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    fetch("https://sleepy-jay-windbreaker.cyclic.app/professeurs")
      .then((response) => response.json())
      .then((data) => setProfesseurs(data))
      .catch((error) => console.error(error));
  }, []);

  const specialites = useMemo(() => {
    // Récupérer les spécialités uniques à partir des professeurs
    const uniqueSpecialites = [
      ...new Set(professeurs.map((professeur) => professeur.specialite)),
    ];

    // Formater les spécialités pour le dropdown
    return uniqueSpecialites.map((specialite, index) => ({
      _id: index + 1,
      name: specialite,
    }));
  }, [professeurs]);

  const villesActuelles = useMemo(() => {
    // Récupérer les villes actuelles uniques à partir des professeurs
    const uniqueVillesActuelles = [
      ...new Set(
        professeurs.map((professeur) => professeur.villeFaculteActuelle)
      ),
    ];

    // Formater les villes actuelles pour le dropdown
    return uniqueVillesActuelles.map((villeActuelle, index) => ({
      _id: index + 1,
      name: villeActuelle,
    }));
  }, [professeurs]);

  const villesDesirees = useMemo(() => {
    // Récupérer les villes désirées uniques à partir des professeurs
    const uniqueVillesDesirees = [
      ...new Set(
        professeurs.flatMap((professeur) => professeur.villeDesiree.split(";"))
      ),
    ];

    // Formater les villes désirées pour le dropdown
    return uniqueVillesDesirees.map((villeDesiree, index) => ({
      _id: index + 1,
      name: villeDesiree,
    }));
  }, [professeurs]);

  const renderListItem = (item) => {
    return (
      <View style={styles.listItem}>
        <Text>
          <Text style={styles.bulletPoint}>• </Text>
          {item.nom} {item.prenom}
          {" ("}
          {item.email}
          {" | "}
          {item.tel}
          {" | "}
          {item.grade}
          {" - "}
          {item.specialite}
          {" - ("}
          {item.faculteActuelle}
          {" | "}
          {item.villeFaculteActuelle}
          {")---->"}
          {item.villeDesiree}
        </Text>
      </View>
    );
  };
  const _renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.name}</Text>
        {/* Ajoutez ici d'autres éléments ou styles que vous souhaitez afficher */}
      </View>
    );
  };

  const handleSpecialiteChange = (item) => {
    setSelectedSpecialite(item._id);
  };

  const handleVilleActuelleChange = (item) => {
    setSelectedVilleActuelle(item._id);
  };

  const handleVilleDesireeChange = (item) => {
    setSelectedVilleDesiree(item._id);
  };
  const handleReset = () => {
    setSelectedSpecialite(initialSpecialite);
    setSelectedVilleActuelle(initialVilleActuelle);
    setSelectedVilleDesiree(initialVilleDesiree);
  };

  // const filteredProfesseurs = useMemo(() => {
  //   // Vérifier si des filtres sont sélectionnés
  //   if (
  //     !selectedSpecialite &&
  //     !selectedVilleActuelle &&
  //     !selectedVilleDesiree
  //   ) {
  //     // Aucun filtre sélectionné, retourner tous les professeurs
  //     return professeurs;
  //   }

  //   // Filtrer les professeurs en fonction des filtres sélectionnés
  //   return professeurs.filter((professeur) => {
  //     // Vérifier chaque filtre et retourner true si le professeur correspond au filtre
  //     const matchSpecialite =
  //       !selectedSpecialite || professeur.specialite === selectedSpecialite;
  //     const matchVilleActuelle =
  //       !selectedVilleActuelle ||
  //       professeur.villeFaculteActuelle === selectedVilleActuelle;
  //     const matchVilleDesiree =
  //       !selectedVilleDesiree ||
  //       professeur.villeDesiree.split(";").includes(selectedVilleDesiree);

  //     return matchSpecialite && matchVilleActuelle && matchVilleDesiree;
  //   });
  // }, [
  //   professeurs,
  //   selectedSpecialite,
  //   selectedVilleActuelle,
  //   selectedVilleDesiree,
  // ]);

  const filteredProfesseurs = useMemo(() => {
    // Filtrer les professeurs en fonction des filtres sélectionnés
    return professeurs.filter((professeur) => {
      const matchSpecialite =
        !selectedSpecialite || professeur.specialite === selectedSpecialite;
      const matchVilleActuelle =
        !selectedVilleActuelle ||
        professeur.villeFaculteActuelle === selectedVilleActuelle;
      const matchVilleDesiree =
        !selectedVilleDesiree ||
        professeur.villeDesiree.split(";").includes(selectedVilleDesiree);

      return matchSpecialite && matchVilleActuelle && matchVilleDesiree;
    });
  }, [
    professeurs,
    selectedSpecialite,
    selectedVilleActuelle,
    selectedVilleDesiree,
  ]);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>search</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Specialty</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={specialites}
            search
            searchPlaceholder="All specialties..."
            labelField="name"
            valueField="_id"
            label="Dropdown"
            placeholder="All specialties"
            value={selectedSpecialite}
            onChange={(item) => setSelectedSpecialite(item.name)}
            renderLeftIcon={() => <Image style={styles.icon} />}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
            ren
          />
          <Text style={styles.text}>Current city</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={villesActuelles}
            search
            searchPlaceholder="All cities..."
            labelField="name"
            valueField="_id"
            label="Dropdown"
            placeholder="All cities"
            value={selectedVilleActuelle}
            onChange={(item) => setSelectedVilleActuelle(item.name)}
            renderLeftIcon={() => <Image style={styles.icon} />}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
            ren
          />
          <Text style={styles.text}>Desired City</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={villesDesirees}
            search
            searchPlaceholder="All cities..."
            labelField="name"
            valueField="_id"
            label="Dropdown"
            placeholder="All cities"
            value={selectedVilleDesiree}
            onChange={(item) => setSelectedVilleDesiree(item.name)}
            renderLeftIcon={() => <Image style={styles.icon} />}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
            ren
          />

          <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Ionicons
              name="reload"
              style={styles.icon}
              size={24}
              color="white"
            />
            <Text style={styles.buttonText}>Reset</Text>
          </TouchableOpacity>

          <Text style={styles.text}>Search results</Text>
          {filteredProfesseurs.map((professeur) => (
            <View key={professeur._id}>{renderListItem(professeur)}</View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 0,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 30,
  },
  dropdown: {
    backgroundColor: "#C2F5A4",
    borderBottomColor: "#059743",
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
  },
  icon: {
    marginHorizontal: 5,
    padding: 5,
  },
  item: {
    paddingVertical: 17,
    paddingHorizontal: 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  shadow: {
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },

  button: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 20,
    width: 100,
    height: 40,
    backgroundColor: "#C70039",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  restaucontainer: {
    backgroundColor: "#fff",
  },
  text: {
    paddingTop: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  professeurContainer: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  professeurName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  professeurInfo: {
    fontSize: 16,
  },
});