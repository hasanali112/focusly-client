import { baseApi } from "@/redux/api/baseApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpenses: builder.mutation({
      query: (payload) => ({
        url: "/expense/create-expense",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useCreateExpensesMutation } = expenseApi;
