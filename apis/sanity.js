import { SanityClient } from "@sanity/client";
import { ImageUrlBuilder } from "@sanity/image-url";
import {SANITY_DATABASE_ID, SANITY_DATABASE_TOKEN, SANITY_DATASETS, SANITY_DATABASE_API_VERSION} from "@env"

const client = new SanityClient({
    projectId: process.env.EXPO_PUBLIC_SANITY_DATABASE_ID,
    dataset: 'production',
    useCdn: true,
    apiVersion: '2021-10-21',
    token: process.env.EXPO_PUBLIC_SANITY_DATABASE_TOKEN,
})


const builder = ImageUrlBuilder(client);

export const urlFor = source=> builder.image(source);

export default client

//sanity cors add http://localhost:3000
