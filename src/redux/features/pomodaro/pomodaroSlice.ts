/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";

interface IPomodaroState {
  pomodaro: {
    id: string | null;
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
    id: null,
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
    resetPromo: (state) => {
      state.pomodaro = initialState.pomodaro;
      state.timeTrack = [];
    },
  },
});

export const { setPomodaro, setTimeTrack, resetPromo } = pomodaroSlice.actions;
export default pomodaroSlice.reducer;
