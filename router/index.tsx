import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Splash, SignIn,  Verification, Home, Shop, Dana, Mission, Health, DanaPilih, DanaSukses, Pulsa, Gopay, Ovo, Linkaja, Seabank, Voucher, Login, MissionDetail} from "../pages";

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
      <Stack.Screen name="Dana" component={Dana} options={{ headerShown: false }} />
      <Stack.Screen name="Mission" component={Mission} options={{ headerShown: false }} />
      <Stack.Screen name="Health" component={Health} options={{ headerShown: false }} />
      <Stack.Screen name="DanaPilih" component={DanaPilih} options={{ headerShown: false }} />
      <Stack.Screen name="DanaSukses" component={DanaSukses} options={{ headerShown: false }} />
      <Stack.Screen name="Pulsa" component={Pulsa} options={{ headerShown: false }} />
      <Stack.Screen name="Gopay" component={Gopay} options={{ headerShown: false }} />
      <Stack.Screen name="Ovo" component={Ovo} options={{ headerShown: false }} />
      <Stack.Screen name="Linkaja" component={Linkaja} options={{ headerShown: false }} />
      <Stack.Screen name="Seabank" component={Seabank} options={{ headerShown: false }} />
      <Stack.Screen name="Voucher" component={Voucher} options={{ headerShown: false }} />
      <Stack.Screen name="MissionDetail" component={MissionDetail} options={{ headerShown: false }} />





    </Stack.Navigator>
  );
}
