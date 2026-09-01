import { baseApi } from "../api/baseApi";

export type TrainingStatus = "TODO" | "INPROGRESS" | "COMPLETED";

export interface TrainingStaffSummary {
  id: string;
  staffId: string;
  firstName: string;
  lastName: string;
  designation: string | null;
}

export interface TrainingParticipant {
  id: string;
  trainingRequestId: string;
  staffId: string;
  staff: TrainingStaffSummary;
}

export interface TrainingRequest {
  id: string;
  description: string;
  type: string;
  durationValue: number;
  durationUnit: string;
  startDate: string;
  mode: string;
  status: TrainingStatus;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  participants: TrainingParticipant[];
}

export interface TrainingListResponse {
  data: TrainingRequest[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface TrainingResponse {
  data: TrainingRequest;
}

export interface CreateTrainingResponse {
  message: string;
  data: TrainingRequest;
}

export interface UpdateTrainingStatusResponse {
  message: string;
  data: TrainingRequest;
}

export interface TrainingSummary {
  totalRequests: number;
  totalStaffTrained: number;
  totalCompleted: number;
  trainingRate: number;
}

export interface TrainingSummaryResponse {
  data: TrainingSummary;
}

export interface GetTrainingsParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: TrainingStatus;
}

export interface CreateTrainingRequest {
  description: string;
  type: string;
  durationValue: number;
  durationUnit: string;
  startDate: string;
  mode: string;
  participantIds: string[];
}

export interface UpdateTrainingStatusRequest {
  id: string;
  status: TrainingStatus;
}

export const trainingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrainings: builder.query<TrainingListResponse, GetTrainingsParams | void>({
      query: (params) => ({
        url: "/trainings",
        method: "GET",
        params: params || undefined,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.map((item) => ({ type: "Training" as const, id: item.id })),
              { type: "Training" as const, id: "LIST" },
            ]
          : [{ type: "Training" as const, id: "LIST" }],
    }),

    getTrainingSummary: builder.query<TrainingSummaryResponse, void>({
      query: () => ({
        url: "/trainings/summary",
        method: "GET",
      }),
      providesTags: [{ type: "Training", id: "SUMMARY" }],
    }),

    getTrainingById: builder.query<TrainingResponse, string>({
      query: (id) => ({
        url: `/trainings/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, id) => [{ type: "Training", id }],
    }),

    createTraining: builder.mutation<CreateTrainingResponse, CreateTrainingRequest>({
      query: (body) => ({
        url: "/trainings",
        method: "POST",
        body,
      }),
      invalidatesTags: [
        { type: "Training", id: "LIST" },
        { type: "Training", id: "SUMMARY" },
      ],
    }),

    updateTrainingStatus: builder.mutation<UpdateTrainingStatusResponse, UpdateTrainingStatusRequest>({
      query: ({ id, status }) => ({
        url: `/trainings/${id}/status`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "Training", id },
        { type: "Training", id: "LIST" },
        { type: "Training", id: "SUMMARY" },
      ],
    }),

    deleteTraining: builder.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `/trainings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Training", id },
        { type: "Training", id: "LIST" },
        { type: "Training", id: "SUMMARY" },
      ],
    }),
  }),
});

export const {
  useGetTrainingsQuery,
  useGetTrainingSummaryQuery,
  useGetTrainingByIdQuery,
  useCreateTrainingMutation,
  useUpdateTrainingStatusMutation,
  useDeleteTrainingMutation,
} = trainingApi;