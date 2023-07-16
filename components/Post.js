import { View } from "react-native";
import { ListItem } from "@rneui/base";
import { Image } from "@rneui/themed";
import RenderHtml from "react-native-render-html";

export default function Post({ item }) {
  return (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>{item.account.username}</ListItem.Title>
        <ListItem.Content>
          <RenderHtml source={{ html: item.content }} />
        </ListItem.Content>
        <View style={{ flexDirection: "row" }}>
          {item.media_attachments
            ?.filter((m) => m.type === "image")
            .map((imageMedia) => (
              <Image
                key={imageMedia.id}
                containerStyle={{ height: 100, width: 100 }}
                source={{ uri: imageMedia.preview_url }}
              />
            ))}
        </View>
      </ListItem.Content>
    </ListItem>
  );
}
