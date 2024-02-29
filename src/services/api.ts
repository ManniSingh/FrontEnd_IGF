import { createApi } from "@reduxjs/toolkit/query/react";
import { request, gql } from "graphql-request";

const endpoint = "https://api.escuelajs.co/graphql";

export const api = createApi({
  reducerPath: "api",
  baseQuery: async (arg, api, extraOptions) => {
    const headers = {
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    };
    try {
      const data = await request({
        url: endpoint,
        document: arg,
        requestHeaders: headers,
      });
      return { data };
    } catch (error) {
      return { error };
    }
  },
  endpoints: (builder) => ({
    getProducts: builder.query({
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
    getProduct: builder.query({
      query: (id) => gql`
        query {
          product(id: "${id}"){
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
    getCategories: builder.query({
      query: () => gql`
        query {
          categories {
            id
            name
            image
          }
        }
      `,
    }),
    login: builder.mutation({
      query: ({ email, password }) => gql`
        mutation {
          login(email: "${email}", password: "${password}") {
            access_token
            refresh_token
          }
        }
      `,
    }),
    register: builder.mutation({
      query: ({ name, email, password, avatar }) => gql`
        mutation {
          addUser(
            data: {
              name: "${name}"
              email: "${email}"
              password: "${password}"
              avatar: "${avatar}"
            }
          ) {
            id
            name
            avatar
          }
        }
      `,
    }),
    isEmailAvailable: builder.query({
      query: (email) => gql`
        query {
          isAvailable(email: "${email}")
        }
      `,
    }),
    getUserProfile: builder.query({
      query: () => gql`
        query {
          myProfile {
            id
            email
            name
            avatar
            role
          }
        }
      `,
    }),
    addProduct: builder.mutation({
      query: ({ title, price, description, categoryId, images }) => {
        const imagesString = `[${images.map((url:string) => `"${url.replace(/"/g, '\\"')}"`).join(',')}]`;
        return gql`
          mutation {
            addProduct(
              data: {
                title: "${title}"
                price: ${Number(price)}
                description: "${description}"
                categoryId: ${Number(categoryId)}
                images: ${imagesString}
              }
            ) {
              title
              price
              images
              category {
                id
                name
                image
              }
            }
          }
        `;
      },
    }),
    updateProduct: builder.mutation({
      query: ({ id, changes }) => gql`
        mutation {
          updateProduct(id: "${id}", changes: ${JSON.stringify(changes)}) {
            title
            price
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
    deleteProduct: builder.mutation({
      query: (id) => gql`
        mutation {
          deleteProduct(id: ${id})
        }
      `,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetCategoriesQuery,
  useLoginMutation,
  useRegisterMutation,
  useIsEmailAvailableQuery,
  useGetUserProfileQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = api;
