import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url";

const client = new SanityClient({
  projectId: process.env.EXPO_PUBLIC_SANITY_DATABASE_ID,
  dataset: "production",
  useCdn: true,
  apiVersion: "2021-10-21",
  token: process.env.EXPO_PUBLIC_SANITY_DATABASE_TOKEN,
});

const builder = ImageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);

export default client;

//sanity cors add http://localhost:3000
