/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface IPomodaroState {
  pomodaro: {
    taskName: string | null;
    date: string | null;
    scheduleTime: string | null;
    scheduleFinishTime: string | null;
    startTime: string | null;
    start: boolean;
  };
  timeTrack: any[];
}

const initialState: IPomodaroState = {
  pomodaro: {
    taskName: null,
    date: null,
    scheduleTime: null,
    scheduleFinishTime: null,
    startTime: null,
    start: false,
  },
  timeTrack: [],
};

const pomodaroSlice = createSlice({
  name: "pomodaro",
  initialState,
  reducers: {
    setPomodaro: (state, action) => {
      state.pomodaro = action.payload;
    },
    setTimeTrack: (state, action) => {
      state.timeTrack.push(action.payload);
    },
  },
});

export const { setPomodaro, setTimeTrack } = pomodaroSlice.actions;
export default pomodaroSlice.reducer;
