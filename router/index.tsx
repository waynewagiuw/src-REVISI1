import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash, SignIn,  Verification, Home, Shop, Dana, Mission, Health, DanaSukses, Login, MissionDetail, Profile, History, TerimaMisi, Submission, TerimaSubmit, SubmitSucces, MisiSukses, HomeAdmin, AddMission, HapusMisi, FotoMission, PilihLogin, LoginAdmin, Notification, Validation, NotificationUser, ResetSukses, ListPoin} from "../pages";
import ResetVerification from "../pages/ResetVerification";
import PermintaanUser from "../pages/PermintaanUser";
import LoginSuperAdmin from "../pages/LoginSuperAdmin";
import HomeSuperAdmin from "../pages/HomeSuper";
import AddListPoin from "../pages/AddListPoin";
import ListPoinUser from "../pages/ListPoinUser";
import EditPoin from "../pages/EditPoin";
import ListStaf from "../pages/ListStaf";
import AddSupervisor from "../pages/AddSupervisor";
import HomeA from "../pages/HomeSuper";
import MissionAdmin from "../pages/MissionAdmin";
import HomeSuper from "../pages/HomeSuper";

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
      <Stack.Screen name="LoginSuperAdmin" component={LoginSuperAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="PilihLogin" component={PilihLogin} options={{ headerShown: false }} />
      <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
      <Stack.Screen name="Validation" component={Validation} options={{ headerShown: false }} />
      <Stack.Screen name="NotificationUser" component={NotificationUser} options={{ headerShown: false }} />
      <Stack.Screen name="ResetSukses" component={ResetSukses} options={{ headerShown: false }} />
      <Stack.Screen name="ResetVerification" component={ResetVerification} options={{ headerShown: false }} />
      <Stack.Screen name="PermintaanUser" component={PermintaanUser} options={{ headerShown: false }} />
      <Stack.Screen name="ListPoin" component={ListPoin} options={{ headerShown: false }} />
      <Stack.Screen name="ListStaf" component={ListStaf} options={{ headerShown: false }} />
      <Stack.Screen name="HomeA" component={HomeA} options={{ headerShown: false }} />
      <Stack.Screen name="ListPoinUser" component={ListPoinUser} options={{ headerShown: false }} />
      <Stack.Screen name="AddListPoin" component={AddListPoin} options={{ headerShown: false }} />
      <Stack.Screen name="AddSupervisor" component={AddSupervisor} options={{ headerShown: false }} />
      <Stack.Screen name="EditPoin" component={EditPoin} options={{ headerShown: false }} />
      <Stack.Screen name="MissionAdmin" component={MissionAdmin} options={{ headerShown: false }} />
      <Stack.Screen name="HomeSuper" component={HomeSuper} options={{ headerShown: false }} />
      

      



    </Stack.Navigator>
  );
}
