import { createApi } from "@reduxjs/toolkit/query/react";
import { request, gql } from "graphql-request";
//fetchBaseQuery doesn't work

const endpoint = "https://api.escuelajs.co/graphql";

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (arg: any) => {
    try {
      const data = await request(endpoint, arg);
      return { data };
    } catch (error) {
      return { error };
    }
  },
  endpoints: (builder) => ({
    getProducts: builder.query<any, void>({
      query: () => gql`
        query {
          products {
            id
            title
            price
            description
            images
            category {
              id
              name
              image
            }
          }
        }
      `,
    }),
  }),
});

export const { useGetProductsQuery } = api;