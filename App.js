import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  TextInput,
  Image,
  ImageBackground,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function App() {
  const currentDate = new Date();
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  const formatDate = currentDate.toLocaleDateString(undefined, options);

  const [day, month, year] = formatDate.split("/");
  const formattedDate = `${day}/${month}/${year}`;

  const [data, setData] = useState([]);

  const [task, setTask] = useState("");

  const [number, setNumber] = useState("");

  const [modelVisible, setModelVisible] = useState("")

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("task");
      if (value !== null) {
        const parsedValue = JSON.parse(value);
        setData(parsedValue);
      }
    } catch (err) {
      console.error(err);
    }
  };

  function start() {
    getData();
  }

  useEffect(start, []);

  const AddItem = async () => {
    try {
      const taskArray = JSON.parse(await AsyncStorage.getItem("task")) || [];
      taskArray.push({number, task, status});
      await AsyncStorage.setItem("task", JSON.stringify(taskArray));
      setModelVisible(false);
      getData();
    }
    catch(error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={s.container}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1696489149180-bb53f8c38bdb?auto=format&fit=crop&q=80&w=1972&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }}
        style={s.backgroundImage}
      >
        <View>
          <Text style={s.text1}>My todo List</Text>
          <Text style={s.text2}>{formattedDate}</Text>
        </View>

        <FlatList data={data} renderItem={itemUi} />
      </ImageBackground>

      <Modal animationType="slide" transparent={true} visible={modelVisible}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1696489149180-bb53f8c38bdb?auto=format&fit=crop&q=80&w=1972&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          style={s.ModelbackgroundImage}
        >
          <View style={s.modal}>
            <View style={s.modalView}>
              <Text style={s.modalTitle}>Add Task</Text>
              <TextInput style={s.textInput} onChange={setNumber}></TextInput>
              <TextInput style={s.textInput} onChange={setTask}></TextInput>
              <View style={s.btnrow}>

                <TouchableOpacity style={[s.button, s.buttonClose]} onPress={() => setModelVisible(!modelVisible)}>
                  <Text style={s.textStyle}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[s.button, s.buttonSave]} onPress={AddItem}>
                  <Text style={s.textStyle}>ADD</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </ImageBackground>
      </Modal>
    </SafeAreaView>
  );

  function itemUi({ item }) {
    return (
      <View style={s.item_row}>
        <TouchableOpacity
          style={[s.item, item.status == "done" ? s.itemRed : null]}
        >
          <View style={s.round}>
            <Text style={s.number}>{item.number}</Text>
          </View>

          <Text style={s.task}>{item.task}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={s.mark}>
          {item.status == "done" ? (
            <Icon size={32} name="check" color="white" />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
}

const s = StyleSheet.create({
  backgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  ModelbackgroundImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    backgroundColor: "#00011E",
    gap: 40,
  },
  text1: {
    marginTop: 50,
    color: "#000",
    fontSize: 28,
    textAlign: "center",
    padding: 15,
    fontWeight: "bold",
    color: "white",
  },
  text2: {
    color: "#000",
    fontSize: 20,
    textAlign: "center",
    padding: 2,
    fontWeight: "bold",
    color: "white",
  },
  task: {
    fontSize: 16,
    paddingEnd: 40,
    color: "#000",
  },
  item_row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginTop: 15,
  },
  item: {
    backgroundColor: "#00F0FF",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginEnd: 10,
    width: "84%",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  itemRed: {
    backgroundColor: "#FF0000",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginEnd: 10,
    width: "84%",
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  round: {
    backgroundColor: "#00011E",
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  number: {
    color: "#ffffff",
    fontSize: 18,
    textAlign: "center",
    lineHeight: 34,
  },
  mark: {
    backgroundColor: "#00011E",
    borderRadius: 4,
    width: 40,
    height: 40,
    borderColor: "#00F0FF",
    borderWidth: 3,
  },
  addBtn: {
    marginHorizontal: 140,
    marginVertical: 30,
    borderRadius: 50,
    backgroundColor: "#00011E",
    borderColor: "#00F0FF",
    borderWidth: 2,
    alignItems: "center",
  },

  modal: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  modalView: {
    margin: 10,
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowColor: "#000",
    elevation: 5,
    gap: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  btnrow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#FF0000",
    paddingHorizontal: 20,
  },
  buttonSave: {
    paddingHorizontal: 30,
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    color: "#000",
    fontWeight: "bold",
  },
  textInput: {
    backgroundColor: "rgba(255, 255, 255, 0.65);",
    borderStyle: "solid",
    width: 350,
    borderRadius: 10,
    fontSize: 20,
    color: "#000",
    fontWeight: "bold",
    paddingVertical: 10,
  },
});
