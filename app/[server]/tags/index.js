import { useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import { ListItem } from "@rneui/base";
import { router, Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { Text, View } from "@/components/Themed";
import axios from "axios";

export default function TagsScreen() {
  const { server } = useLocalSearchParams();

  const onRenderItem = useCallback(({ item }) => {
    return (
      <ListItem
        onPress={() =>
          router.push({
            pathname: "/[server]/tags/[tag]",
            params: { server, tag: item.name },
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
    queryKey: [`popularTags-${server}`],
    queryFn: () =>
      axios
        .get(`https://${server}/api/v1/trends/tags?local=true`)
        .then((res) => res.data),
  });

  if (isLoading) return <Text>'Loading...'</Text>;

  if (error) return "An error has occurred: " + <Text>error.message</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: server }} />
      <FlatList
        data={[{ name: 'public'}, ...data]}
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
