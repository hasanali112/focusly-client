import { baseApi } from "@/redux/api/baseApi";
import { IArgs } from "../task/taskApi";

const expenseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createExpenses: builder.mutation({
      query: (payload) => ({
        url: "/expense/create-expense",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Expense"],
    }),
    getExpenses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (params) {
          args.forEach((arg: IArgs) => {
            params.append(arg.key, arg.value);
          });
        }
        return {
          url: "/expense/get-expense",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Expense"],
    }),
  }),
});

export const { useCreateExpensesMutation, useGetExpensesQuery } = expenseApi;
