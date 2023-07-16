import { useCallback } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { ListItem } from "@rneui/base";
import { Image } from "@rneui/themed";
import RenderHtml from 'react-native-render-html';
import { useLocalSearchParams, Stack } from 'expo-router';
import {
  useQuery,
} from "@tanstack/react-query";

import { Text } from "@/components/Themed";
import axios from "axios";

export default function TagScreen() {
  const { tag } = useLocalSearchParams();

  const onRenderItem = useCallback(({ item }) => {
    console.log(item);
    return (
      <ListItem>
        <ListItem.Content>
          <ListItem.Title>{item.account.username}</ListItem.Title>
          <ListItem.Content><RenderHtml source={{ html: item.content}}/></ListItem.Content>
        </ListItem.Content>
        <View style={{ flexDirection: 'row' }}>
          {item.media_attachments?.filter(m => m.type === 'image').map(imageMedia => 
            <Image containerStyle={{ height: 100, width: 100 }} source={{ uri: imageMedia.preview_url }} />   
          )}
        </View>
      </ListItem>
    );
  }, []);

  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["publicTimeline"],
    queryFn: () =>
      axios
        .get(`https://mastodon.social/api/v1/timelines/tag/${tag}`)
        .then((res) => res.data),
  }, [tag]);

  if (isLoading) return <Text>'Loading...'</Text>;

  if (error) return "An error has occurred: " + <Text>error.message</Text>;

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: tag }} />
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
