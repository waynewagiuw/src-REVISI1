import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash, SignIn,  Verification, Home, Shop, Dana, Mission, Health, DanaSukses, Login, MissionDetail, Profile, History, TerimaMisi, Submission, TerimaSubmit, SubmitSucces, MisiSukses, HomeAdmin, AddMission, HapusMisi, FotoMission, PilihLogin, LoginAdmin, Notification, Validation, NotificationUser, ResetSukses} from "../pages";
import ResetVerification from "../pages/ResetVerification";

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Verification" component={Verification} options={{ headerShown: false }} />
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Shop" component={Shop} options={{ headerShown: false }} />
      <Stack.Screen name="Mission" component={Mission} options={{ headerShown: false }} />
      <Stack.Screen name="History" component={History} options={{ headerShown: false }} />
      <Stack.Screen name="DanaSukses" component={DanaSukses} options={{ headerShown: false }} />
      <Stack.Screen name="MissionDetail" component={MissionDetail} options={{ headerShown: false }} />
      <Stack.Screen name="TerimaMisi" component={TerimaMisi} options={{ headerShown: false }} />
      <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name="Submission" component={Submission} options={{ headerShown: false }} />
      <Stack.Screen name="TerimaSubmit" component={TerimaSubmit} options={{ headerShown: false }} />
      <Stack.Screen name="MisiSukses" component={MisiSukses} options={{ headerShown: false }} />
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="AddMission" component={AddMission} options={{ headerShown: false }} />
      <Stack.Screen name="HapusMisi" component={HapusMisi} options={{ headerShown: false }} />
      <Stack.Screen name="FotoMission" component={FotoMission} options={{ headerShown: false }} />
      <Stack.Screen name="LoginAdmin" component={LoginAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="PilihLogin" component={PilihLogin} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="Validation" component={Validation} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationUser" component={NotificationUser} options={{ headerShown: false }} />
      <Stack.Screen name="ResetSukses" component={ResetSukses} options={{ headerShown: false }} />
      <Stack.Screen name="ResetVerification" component={ResetVerification} options={{ headerShown: false }} />


      



    </Stack.Navigator>
  );
}
