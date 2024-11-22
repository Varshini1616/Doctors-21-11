import { Stack } from 'expo-router';

// Ensure that all screens do not wrap their content in `NavigationContainer`.
// Instead, they should simply return the component structure.

export default function RootLayout() {
  return (
    <Stack initialRouteName="SplashScreen">
      {/* Define your screen stack */}
      <Stack.Screen name="SplashScreen" options={{ title: 'Splash' }} />
      <Stack.Screen name="WelcomeScreen" options={{ title: 'Welcome' }} />
      <Stack.Screen name="LoginScreen" options={{ title: 'Login' }} />
      <Stack.Screen name="ForgotPasswordScreen" options={{ title: 'Forgot Password' }} />
      <Stack.Screen name="SignUpScreen" options={{ title: 'Sign Up' }} />
      <Stack.Screen name="DashboardScreen" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="PersonalDetailsScreen" options={{ title: 'Personal Details' }} />
      <Stack.Screen name="PackageDetailsScreen" options={{ title: 'Package Details' }} />
      <Stack.Screen name="BeneficiaryDetailsScreen" options={{ title: 'Beneficiary Details' }} />
      <Stack.Screen name="SubscriptionScreen" options={{ title: 'Subscription' }} />
      <Stack.Screen name="AddBeneficiaryScreen" options={{ title: 'Add Beneficiary' }} />
      <Stack.Screen name="ContactUsScreen" options={{ title: 'Contact Us' }} />
      <Stack.Screen name="BeneficiarySelectionScreen" options={{ title: 'Beneficiary popup' }} />
      <Stack.Screen name="AutoChat" options={{ title: 'AutoChat' }} />
      <Stack.Screen name="GamesScreen" options={{ title: 'Games' }} />
      <Stack.Screen name="HealthGameOne" options={{ title: 'Health Game 1' }} />
      <Stack.Screen name="HealthGameTwo" options={{ title: 'Health Game 2' }} />
      <Stack.Screen name="HealthGameThree" options={{ title: 'Health Game 3' }} />
      <Stack.Screen name="BMICalculatorScreen" options={{ title: 'Health Calculator' }} />
      <Stack.Screen name="Healthtips" options={{ title: 'HealthTips' }} />
      <Stack.Screen name="Planspage" options={{ title: 'Plans' }} />
      <Stack.Screen name="ImageScreen" options={{ title: 'Sleep' }} />
      <Stack.Screen name="StoresScreen" options={{ title: 'Stores' }} />
      <Stack.Screen name="DoctorScreen" options={{ title: 'Doctor Consultation' }} />
      
      {/* Uncomment and use these screens as needed. Make sure their content doesn't include `NavigationContainer`. */}
      
      <Stack.Screen name="HCTipsScreen" options={{ title: 'Health Care Tips' }} />
      <Stack.Screen name="MenScreen" options={{ title: 'Men' }} />
      <Stack.Screen name="WomenScreen" options={{ title: 'Women' }} />
      <Stack.Screen name="ChildScreen" options={{ title: 'Child' }} />
      <Stack.Screen name="SleepScreen" options={{ title: 'Sleep Monitor' }} />
      <Stack.Screen name="WakingScreen" options={{ title: 'Waking Monitor' }} />
      <Stack.Screen name="WaterScreen" options={{ title: 'Water Monitor' }} />
     
    </Stack>
  );
}
