import { baseApi } from "@/redux/api/baseApi";

interface ITask {
  key: string;
  value: string;
}

const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTasks: builder.mutation({
      query: (payload) => ({
        url: "/task/create-task",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Task"],
    }),
    getAllTasks: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          args.forEach((arg: ITask) => {
            params.append(arg.key, arg.value);
          });
        }

        return {
          url: "/task/get-tasks",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Task"],
    }),
  }),
});

export const { useCreateTasksMutation, useGetAllTasksQuery } = taskApi;
