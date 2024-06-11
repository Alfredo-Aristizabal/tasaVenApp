import { color } from "@rneui/base";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [monitor, setMonitor] = useState();
  const [bcv, setBcv] = useState();
  const [usd, setUsd] = useState(0);
  const [bs, setBs] = useState(0);

  useEffect(() => {
    if (usd !== '') {
      setBs((usd * bcv).toFixed(2)); // Ajusta esta lógica según tu necesidad
    } else {
      setBs(0);
    }
  }, [usd]);
  const getMonitorDolar = async () => {
    try {
      const response = await fetch(
        "https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/enparalelovzla"
      );
      const data = await response.json();
      setMonitor(data.price);
    } catch (error) {
      console.error(error);
    }
  };

  const getBCVDolar = async () => {
    try {
      const response = await fetch(
        "https://pydolarvenezuela-api.vercel.app/api/v1/dollar?page=bcv"
      );
      const data = await response.json();
      setBcv(data.monitors.usd.price);
    } catch (error) {
      console.error(error);
    }
  };

  getBCVDolar();
  getMonitorDolar();
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 25,
          marginBottom: 32,
          shadowColor: "black",
          shadowOffset: {
            width: 6,
            height: 6,
          },
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 16,
          backgroundColor: "black",
        }}
      >
        <Text
          style={{
            color: "white",
            marginTop: 20,
            textAlign: "center",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          Tasa Ven
        </Text>
      </View>
      <View
        style={{ display: "flex", flexDirection: "column", padding: 20, paddingHorizontal:30, }}
      >
        <View style={styles.container}>
          <View style={styles.containerInfoTasa}>
            <Image
              style={{
                width: 60,
                height: 60,
                margin: "auto",
              }}
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAuReGZsSqOOWn7V7hZEYwlwSs95XZU5wfvA&s",
              }}
            />
            <Text style={styles.StyledTextTitleInfoTasaMonitor}>
              <Text
                style={{
                  color: "#FFCC10",
                }}
              >
                Mon
                <Text
                style={{
                  color: "#224A85",
                }}
              >
               i
              </Text>
              </Text>
              <Text
                style={{
                  color: "#224A85",
                }}
              >
                tor
              </Text>
              <Text
                style={{
                  color: "#992D2A",
                }}
              >
                USD
              </Text>
            </Text>
            <Text style={styles.StyledTextPrice}>{monitor}</Text>
          </View>

          <View style={styles.containerInfoTasa}>
            <Image
              style={{
                width: 60,
                height: 60,
                margin: "auto",
              }}
              source={{
                uri: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEghXp_oP8cy8F8IsqxiOWnlTY8PNpVBrwVEq8Uv31URazLZMF6oS5hrlTPBmjt_QjE743Aj8az0jQICXLhBA3mMLSrag7etE3bfYd1BQA-vWyIVopCy6Z085PMyLE4OK5C-qM8LiUfgj4I/s575/BCV1.png",
              }}
            />
            <Text style={styles.StyledTextTitleInfoTasaBCV}>BCV USD</Text>
            <Text style={styles.StyledTextPrice}>{bcv}</Text>
          </View>
          <StatusBar style="light" />
        </View>
        <View style={{
          display:'flex',
          flexDirection: 'column',
          marginTop: 40,
          gap:20
        }}>
       
          <View style={{position:'relative'}}>
          <TextInput 
          placeholder="Dólares"
          selectionColor="black"
          keyboardType="numeric" 
          value={usd}
          onChange={(value)=> { 
            setUsd(Number(value.nativeEvent.text)) 
            setBs(usd*bcv)
          }}
          maxLength={10}
          style={{
            padding:5,
            paddingLeft: 40,
            width:'70%',
            borderRadius: 5,
            height:50,
            borderWidth: 1,

          }}>
          
          </TextInput>
            <Image
             source={require('./assets/coin.png')}
             style={{position:'absolute', width:25, height:25, bottom:13, left: 5}}
             ></Image>
          </View>

          <View style={{position:'relative'}}>
          <TextInput 
          placeholder="Bolívares"
          selectionColor="black"
          keyboardType="numeric"
          value={bs}
          onChange={(value)=> {
            setbs(value.nativeEvent.text)
          }}
          maxLength={10}
          style={{
            padding:5,
            width:'70%',
            paddingLeft: 40,
            borderRadius: 5,
            height:50,
            borderWidth: 1,

          }}>

          </TextInput>
            <Image
             source={require('./assets/bolivar.png')}
             style={{position:'absolute', width:25, height:25, bottom:13, left: 5}}
             ></Image>
          </View>
      
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    marginTop: 10,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  containerInfoTasa: {
    gap: 5,
  },
  StyledTextTitleInfoTasaBCV: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#006296",
  },
  StyledTextTitleInfoTasaMonitor: {
    fontSize: 25,
    fontWeight: "bold",
  },
  StyledTextPrice: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
});
