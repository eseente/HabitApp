import { StyleSheet, Text, View, ScrollView, Pressable, Image } from 'react-native'
import React, { useState,useEffect } from 'react'
import { Ionicons, Feather, EvilIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { BottomModal, ModalContent, ModalTitle, SlideAnimation } from 'react-native-modals';

const index = () => {
    const [option,setOption] = useState("Today");
    const router = useRouter();
    const [habits,setHabits] = useState([]);
    const [isModalVisible,setModalVisible] = useState(false);

    useEffect(() => {
      fetchHabits();
    }, []);

    const fetchHabits = async () => {
      try {
        const response = await axios.get("http://192.168.0.101:3000/habitsList");
         setHabits(response.data)
      } catch (error) {
        console.log("error fetching habits",error)
      }
    }
    console.log("habits",habits)
  return (
    <>
    <ScrollView style={{flex:1,backgroundColor:'white',padding:10}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
      <Ionicons name="logo-foursquare" size={27} color="black" />
      <AntDesign onPress={()=>router.push("/home/create")} name="plus" size={24} color="black" />
      </View>

      <Text style={{marginTop:5,fontSize:23,fontWeight:"500"}}>Habits</Text>
      
      <View style={{flexDirection:'row',alignItems:'center',gap:10,marginVertical:8}}>
        <Pressable 
        onPress={()=> setOption("Today")}
        style={{backgroundColor: option == "Today" ? "#E0FFFF": "transparent",paddingHorizontal:10,paddingVertical:8,borderRadius:25}}>
            <Text style={{textAlign:'center',color:'gray',fontSize:14}}>Today</Text>
        </Pressable>

        <Pressable 
        onPress={()=> setOption("Weekly")}
        style={{backgroundColor: option == "Weekly" ? "#E0FFFF": "transparent",paddingHorizontal:10,paddingVertical:8,borderRadius:25}}>
            <Text style={{textAlign:'center',color:'gray',fontSize:14}}>Weekly</Text>
        </Pressable>

        <Pressable 
        onPress={()=> setOption("Overall")}
        style={{backgroundColor: option == "Overall" ? "#E0FFFF": "transparent",paddingHorizontal:10,paddingVertical:8,borderRadius:25}}>
            <Text style={{textAlign:'center',color:'gray',fontSize:14}}>Overall</Text>
        </Pressable>
      </View>
    
    {option == "Today" &&
      habits?.length > 0 ? (
        <View>
          {habits?.map((item,index) =>(
            <Pressable 
            onLongPress={()=> setModalVisible(!isModalVisible)}
            style={{marginVertical:10,backgroundColor:item?.color,padding:12,borderRadius:24}}>
              <Text style={{textAlign:"center",fontWeight:"500",color:"white"}}>{item?.title}</Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <View style={{marginTop:150,justifyContent:'center',alignItems:'center', marginBottom:'auto'}}>
          <Image
          style={{width:60, height:60,resizeMode:"cover"}}
          source={{
            url:"https://cdn-icons-png.flation.com/128/10609/10609386.png"
          }}
          />
          
          <Text style={{textAlign:'center',fontSize:20,fontWeight:"600",marginTop:10}}>No habits for today</Text>
          <Text style={{textAlign:'center',fontSize:20,fontWeight:"600",marginTop:10}}>No habits for today.Create one?</Text>
          <Pressable 
            onPress={()=>router.push("/home/create")}
            style={{backgroundColor:"#0071c5",marginTop:20,paddingHorizontal:20,paddingVertical:10,marginLeft:'auto',marginRight:'auto'}}>
              <Text>Create</Text>
          </Pressable>
        </View>
      )
    }
    </ScrollView>

    <BottomModal 
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Choose Option" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: "bottom",
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)} 
      >
        <ModalContent style={{width:"100%",height:280}}>
          <View style={{marginVertical:10}}>
            <Text>Options</Text>
            <Pressable style={{flexDirection:'row',alignItems:'center',gap:12,marginTop:10}}>
              <Ionicons name="checkmark-circle-outline" size={24} color="black" />
              <Text>Completed</Text>
            </Pressable>

            <Pressable style={{flexDirection:'row',alignItems:'center',gap:12,marginTop:10}}>
            <Feather name="skip-forward" size={24} color="black" />              
            <Text>Skip</Text>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
              }}
            >
              <Feather name="edit-2" size={24} color="black" />
              <Text>Edit</Text>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
              }}
            >
              <EvilIcons name="archive" size={24} color="black" />
              <Text>Archive</Text>
            </Pressable>

            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 12,
                marginTop: 12,
              }}
            >
              <AntDesign name="delete" size={24} color="black" />
              <Text>Delete</Text>
            </Pressable>

          </View>
        </ModalContent>
    </BottomModal>
    </>
  )
}

export default index

const styles = StyleSheet.create({})