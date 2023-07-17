import { useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useTheme, ListItem } from "@rneui/themed";
import {
  useQuery,
} from "@tanstack/react-query";
import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "@/components/Themed";
import servers from '../../data/servers';

export default function ServerScreen() {
  const { theme } = useTheme();
  console.log(theme);
  const onRenderItem = useCallback(({ item }) => {
    return <ListItem
    onPress={() =>
      router.push({
        pathname: "/[server]/tags",
        params: { server: item.domain },
      })
    }
  >
    <ListItem.Content>
      <ListItem.Title>{item.name}</ListItem.Title>
    </ListItem.Content>
  </ListItem>
  }, []);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["servers"],
    queryFn: () => servers
  });

  if (isLoading) return <Text>'Loading...'</Text>;

  if (error) return "An error has occurred: " + <Text>error.message</Text>;

  console.log(data);

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          title: "Servers",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} size={20} name="server-outline" />
          ),
        }}
      />
      <FlatList
        data={data}
        renderItem={onRenderItem}
        keyExtractor={(item) => item.domain}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
