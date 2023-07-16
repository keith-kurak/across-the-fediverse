import { useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useTheme } from "@rneui/themed";
import {
  useQuery,
} from "@tanstack/react-query";

import { Text, View } from "@/components/Themed";
import axios from "axios";
import Post from '../../components/Post'

export default function TabOneScreen() {
  const { theme } = useTheme();
  console.log(theme);
  const onRenderItem = useCallback(({ item }) => {
    return <Post item={item} />
  }, []);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["publicTimeline"],
    queryFn: () =>
      axios
        .get("https://mastodon.social/api/v1/timelines/public")
        .then((res) => res.data),
  });

  if (isLoading) return <Text>'Loading...'</Text>;

  if (error) return "An error has occurred: " + <Text>error.message</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={onRenderItem}
        keyExtractor={(item) => item.id}
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
