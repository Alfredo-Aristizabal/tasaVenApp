import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Row from "./components/Row";
import Button from "./components/Button";
import calculator, { initialState } from "./util/calculator";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [monitor, setMonitor] = useState();
  const [bcv, setBcv] = useState();
  const [initialStateCalc, setInitialStateCalc] = useState(initialState)
  HandleTap = (type, value) => {
    setInitialStateCalc((initialStateCalc) => calculator(type, value, initialStateCalc));
  };
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
          paddingVertical: 20,
          marginVertical: 32,
          paddingHorizontal: 20,
          backgroundColor: "black",
        }}
      >
        <Text
          style={{
            color: "white",
            textAlign: "center",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Tasa Ven
        </Text>
      </View>
      <View style={styles.container}>
        <View style={styles.containerInfoTasa}>
          <Text style={styles.StyledTextTitleInfoTasaMonitor}>
            <Text
              style={{
                color: "#FFCC10",
              }}
            >
              Moni
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
                color: "#224A85",
              }}
            >
              D
              <Text
                style={{
                  color: "#992D2A",
                }}
              >
                olar
              </Text>
            </Text>
          </Text>
          <Text style={styles.StyledTextPrice}>{monitor}</Text>
        </View>

        <View>
          <Text style={styles.StyledTextTitleInfoTasaBCV}>BCV Dolar</Text>
          <Text style={styles.StyledTextPrice}>{bcv}</Text>
        </View>
        <StatusBar style="auto" />
      </View>

      <View
        style={{
          margin:'auto',
          marginTop: 60,
          width: "90%",
          padding: 2,
          height: 60,
          borderWidth: 1,
          borderColor: "black",
        }}
      >
        <SafeAreaView>
        <View>
        
        <Text style={styles.value}>
            {initialStateCalc.currentValue.toLocaleString()}
          </Text>
        </View>
        <View style={{marginTop:50}}>
          <Row>
            
          <Button
              text="C"
              theme="secondary"
              onPress={() => HandleTap("clear")}
            />

            <Button
              text="+/-"
              theme="secondary"
              onPress={() => HandleTap("posneg")}
            />

            <Button
              text="%"
              theme="secondary"
              onPress={() => HandleTap("percentage")}
            />

            <Button
              text="/"
              theme="accent"
              onPress={() => HandleTap("operator", "/")}
            />
          </Row>
           {/* Number */}
           <Row>
            <Button text="7" onPress={() => HandleTap("number", 7)} />
            <Button text="8" onPress={() => HandleTap("number", 8)} />
            <Button text="9" onPress={() => HandleTap("number", 9)} />
            <Button
              text="X"
              theme="accent"
              onPress={() => HandleTap("operator", "*")}
            />
          </Row>

          <Row>
            <Button text="5" onPress={() => HandleTap("number", 5)} />
            <Button text="6" onPress={() => HandleTap("number", 6)} />
            <Button text="7" onPress={() => HandleTap("number", 7)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => HandleTap("operator", "-")}
            />
          </Row>

          <Row>
            <Button text="1" onPress={() => HandleTap("number", 1)} />
            <Button text="2" onPress={() => HandleTap("number", 2)} />
            <Button text="3" onPress={() => HandleTap("number", 3)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => HandleTap("operator", "+")}
            />
          </Row>

          <Row>
            <Button text="0" onPress={() => HandleTap("number", 0)} />
            <Button text="." onPress={() => HandleTap("number", ".")} />
            <Button
              text="="
              theme="primary"
              onPress={() => HandleTap("equal", "=")}
            />
          </Row>
        </View>
        </SafeAreaView>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    marginTop: 10,
    padding: "20px",
    alignItems: "flex-start",
    justifyContent: "space-around",
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
