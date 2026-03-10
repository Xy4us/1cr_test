import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Goal {
  id: string;
  category: string;
  title: string;
  targetAmount: number;
  targetDate: string;
  currentAmount: number;
}

interface GoalsState {
  items: Goal[];
}

const initialState: GoalsState = {
  items: [
    { 
      id: "1", 
      category: "emergency", 
      title: "Reserve Fund", 
      targetAmount: 51000, 
      currentAmount: 31000, 
      targetDate: "2025-12-31" 
    },
    { 
      id: "2", 
      category: "vacation", 
      title: "Travel — Europe", 
      targetAmount: 4000, 
      currentAmount: 2500, 
      targetDate: "2025-08-15" 
    },
    { 
      id: "3", 
      category: "car", 
      title: "Car — New SUV", 
      targetAmount: 6000, 
      currentAmount: 1600, 
      targetDate: "2026-06-01" 
    },
    { 
      id: "4", 
      category: "home", 
      title: "Real Estate", 
      targetAmount: 20000, 
      currentAmount: 8300, 
      targetDate: "2030-01-01" 
    },
  ],
};

const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {
    addGoal: (state, action: PayloadAction<Goal>) => {
      state.items.push(action.payload);
    },
    removeGoal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((goal) => goal.id !== action.payload);
    },
    updateGoalProgress: (state, action: PayloadAction<{ id: string; amount: number }>) => {
      const goal = state.items.find((g) => g.id === action.payload.id);
      if (goal) {
        goal.currentAmount = action.payload.amount;
      }
    },
  },
});

export const { addGoal, removeGoal, updateGoalProgress } = goalsSlice.actions;
export default goalsSlice.reducer;
