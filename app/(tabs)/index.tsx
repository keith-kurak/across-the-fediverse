import { useCallback } from "react";
import { StyleSheet, FlatList } from "react-native";
import { ListItem } from "@rneui/base";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import axios from "axios";

export default function TabOneScreen() {
  const onRenderItem = useCallback(({ item }) => {
    console.log(item);
    return (
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{item.account.username}</ListItem.Title>
          <ListItem.Content>{item.content}</ListItem.Content>
        </ListItem.Content>
      </ListItem>
    );
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

  console.log(data);

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
