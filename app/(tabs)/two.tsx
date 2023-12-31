import { useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import { ListItem } from "@rneui/base";
import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";

import { Text, View } from "@/components/Themed";
import axios from "axios";

export default function TabTwoScreen() {
  const onRenderItem = useCallback(({ item }) => {
    return (
      <ListItem
        onPress={() =>
          router.push({
            pathname: "/[server]/tags/[tag]",
            params: { server: "mastadon.social", tag: item.name },
          })
        }
      >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
        </ListItem.Content>
      </ListItem>
    );
  }, []);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["popularTags"],
    queryFn: () =>
      axios
        .get("https://mastodon.social/api/v1/trends/tags")
        .then((res) => res.data),
  });

  if (isLoading) return <Text>'Loading...'</Text>;

  if (error) return "An error has occurred: " + <Text>error.message</Text>;

  return (
    <View style={styles.container}>
      <Tabs.Screen
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => (
            <Ionicons color={color} size={20} name="star-outline" />
          ),
        }}
      />
      <FlatList
        data={data}
        renderItem={onRenderItem}
        keyExtractor={(item) => item.name}
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
