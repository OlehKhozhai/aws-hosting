import { RootState } from "./store"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { BASE_URL, doFetch, TO_DO_PATH } from "../helpers/api"
import { RequestStatus } from "../helpers/enums"

export type ToDo = {
  id: string
  text: string
  active: boolean
}

export type Status = `${RequestStatus}`

type InitialState = {
  list: ToDo[]
  loading: Status
}

// actions
export const getToDoListAction = createAsyncThunk("GET_TODO_LIST", async () => {
  return doFetch<ToDo[]>({ url: `${BASE_URL}/${TO_DO_PATH}` })
})
export const createToDoAction = createAsyncThunk(
  "CREATE_TODO",
  async (text: string) => {
    return doFetch<ToDo>({
      url: `${BASE_URL}/${TO_DO_PATH}`,
      params: {
        method: "POST",
        body: JSON.stringify({ text, active: "true" }),
      },
    })
  }
)
export const removeToDoAction = createAsyncThunk(
  "REMOVE_TODO",
  async ({ id, text }: Partial<ToDo>) =>
    await doFetch<ToDo>({
      url: `${BASE_URL}/${TO_DO_PATH}`,
      params: {
        method: "DELETE",
        body: JSON.stringify({ id, text }),
      },
    })
)

// reducer
const initialState: InitialState = {
  list: [],
  loading: "idle",
}

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getToDoListAction.pending, (state) => {
      state.loading = "pending"
    })
    builder.addCase(getToDoListAction.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.list = action.payload
    })
    builder.addCase(getToDoListAction.rejected, (state) => {
      state.loading = "failed"
    })

    builder.addCase(createToDoAction.pending, (state) => {
      state.loading = "pending"
    })
    builder.addCase(createToDoAction.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.list.unshift(action.payload)
    })
    builder.addCase(createToDoAction.rejected, (state) => {
      state.loading = "failed"
    })

    builder.addCase(removeToDoAction.pending, (state) => {
      state.loading = "pending"
    })
    builder.addCase(removeToDoAction.fulfilled, (state, action) => {
      state.loading = "succeeded"
      state.list = state.list.filter(({ id }) => id !== action.payload.id)
    })
    builder.addCase(removeToDoAction.rejected, (state) => {
      state.loading = "failed"
    })
  },
})

// selectors
export const todoSelector = (state: RootState) => state.todo

export default todoSlice.reducer
