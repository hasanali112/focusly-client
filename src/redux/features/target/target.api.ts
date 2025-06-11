import { baseApi } from "@/redux/api/baseApi";

const targetApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTarget: builder.mutation({
      query: (payload) => ({
        url: "/target/create-target",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Target"],
    }),
  }),
});

export const { useCreateTargetMutation } = targetApi;
