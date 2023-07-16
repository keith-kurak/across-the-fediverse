import { useCallback } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Divider } from "@rneui/themed";
import { useLocalSearchParams, Stack } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import Post from '../../../../components/Post'

import { Text } from "@/components/Themed";
import axios from "axios";

export default function TagScreen() {
  const { tag } = useLocalSearchParams();

  const onRenderItem = useCallback(({ item }) => {
    return <Post item={item} />
  }, []);

  const { isLoading, error, data, isFetching } = useQuery(
    {
      queryKey: ["publicTiPostmeline"],
      queryFn: () =>
        axios
          .get(`https://mastodon.social/api/v1/timelines/tag/${tag}`)
          .then((res) => res.data),
    },
    [tag],
  );

  if (isLoading) return <Text>'Loading...'</Text>;

  if (error) return "An error has occurred: " + <Text>error.message</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: tag }} />
      <FlatList
        data={data}
        renderItem={onRenderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
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
