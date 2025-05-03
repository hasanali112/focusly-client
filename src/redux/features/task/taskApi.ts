import { baseApi } from "@/redux/api/baseApi";

export interface IArgs {
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
          args.forEach((arg: IArgs) => {
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
    updateTask: builder.mutation({
      query: (id) => ({
        url: `/task/update-task/${id}`,
        method: "PATCH",
      }),
      invalidatesTags: ["Task"],
    }),
    getSingleTask: builder.query({
      query: (id) => ({
        url: `/task/get-single-task/${id}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
    updateStartAndEndTime: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/task/update-start-and-end-time/${id}`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Task"],
    }),
  }),
});

export const {
  useCreateTasksMutation,
  useGetAllTasksQuery,
  useUpdateTaskMutation,
  useUpdateStartAndEndTimeMutation,
  useGetSingleTaskQuery,
} = taskApi;
