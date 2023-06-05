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

  const filteredProfesseurs = useMemo(() => {
    // Vérifier si des filtres sont sélectionnés
    if (
      !selectedSpecialite &&
      !selectedVilleActuelle &&
      !selectedVilleDesiree
    ) {
      // Aucun filtre sélectionné, retourner tous les professeurs
      return professeurs;
    }

    // Filtrer les professeurs en fonction des filtres sélectionnés
    return professeurs.filter((professeur) => {
      // Vérifier chaque filtre et retourner true si le professeur correspond au filtre
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
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.text}>Spécialité</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={specialites}
            search
            searchPlaceholder="Search"
            labelField="name"
            valueField="_id"
            label="Dropdown"
            placeholder="Toutes les spécialités"
            value={selectedSpecialite}
            onChange={(item) => setSelectedSpecialite(item._id)}
            renderLeftIcon={() => <Image style={styles.icon} />}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
            ren
          />
          <Text style={styles.text}>Ville Actuelle</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={villesActuelles}
            search
            searchPlaceholder="Search"
            labelField="name"
            valueField="_id"
            label="Dropdown"
            placeholder="Toutes les villes"
            value={selectedVilleActuelle}
            onChange={(item) => setSelectedVilleActuelle(item._id)}
            renderLeftIcon={() => <Image style={styles.icon} />}
            renderItem={(item) => _renderItem(item)}
            textError="Error"
            ren
          />
          <Text style={styles.text}>Ville Désirée</Text>
          <Dropdown
            style={styles.dropdown}
            containerStyle={styles.shadow}
            data={villesDesirees}
            search
            searchPlaceholder="Search"
            labelField="name"
            valueField="_id"
            label="Dropdown"
            placeholder="Toutes les villes"
            value={selectedVilleDesiree}
            onChange={(item) => setSelectedVilleDesiree(item._id)}
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
            <Text style={styles.buttonText}>Réinitialiser</Text>
          </TouchableOpacity>

          <Text style={styles.text}>Formations des Professeurs</Text>
          {filteredProfesseurs.map((professeur) => (
            <View key={professeur._id}>
              <Text style={styles.professeurInfo}>
                {professeur.nom} {professeur.prenom} ({professeur.email} |
                {professeur.tel} | {professeur.grade}) - {professeur.specialite}
                ({professeur.faculteActuelle} |{professeur.villeFaculteActuelle}
                ){professeur.villeDesiree}
              </Text>
            </View>
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
    backgroundColor: "white",
    borderBottomColor: "gray",
    borderRadius: 20,
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
    width: 150,
    height: 40,
    backgroundColor: "#2E86C1",
    borderRadius: 20,
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
