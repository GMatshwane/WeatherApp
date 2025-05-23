import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { WeatherThemeProvider } from "../contexts/WeatherThemeContext";
import { useWeatherTheme } from "../hooks/useWeatherTheme";
import { FavouritesServiceProvider } from "../services/favourites/FavouritesServiceContext";
import { LocationServiceProvider } from "../services/location/LocationServiceContext";
import { WeatherServiceProvider } from "../services/weather/WeatherServiceContext";

/**
 * The layout component.
 */
export default function Layout() {
  const { backgroundColor } = useWeatherTheme();

  return (
    <LocationServiceProvider>
      <WeatherServiceProvider>
        <FavouritesServiceProvider>
          <WeatherThemeProvider>
            <Tabs
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: backgroundColor,
                },
              }}
            >
              <Tabs.Screen
                name="index"
                options={{
                  title: "Weather",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="sunny" size={size} color={color} />
                  ),
                }}
              />
              <Tabs.Screen
                name="favourites"
                options={{
                  title: "Favourites",
                  tabBarIcon: ({ color, size }) => (
                    <Ionicons name="heart" size={size} color={color} />
                  ),
                }}
              />
            </Tabs>
          </WeatherThemeProvider>
        </FavouritesServiceProvider>
      </WeatherServiceProvider>
    </LocationServiceProvider>
  );
}
