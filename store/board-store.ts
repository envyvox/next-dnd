import { create } from "zustand"

import { databases } from "@/lib/appwrite"
import { getTasksGroupedByColumn } from "@/lib/get-tasks-grouped-by-column"

export type BoardState = {
  board: Board
  getBoard: () => void
  setBoardState: (board: Board) => void
  updatetaskInDb: (task: Task, columnId: ColumnType) => void
}

export const useBoardStore = create<BoardState>((set) => ({
  board: {
    columns: new Map<ColumnType, Column>(),
  },
  getBoard: async () => {
    const board = await getTasksGroupedByColumn()
    set({ board })
  },
  setBoardState: (board) => set({ board }),
  updatetaskInDb: async (task, columnId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_TASKS_COLLECTION_ID!,
      task.$id,
      {
        title: task.title,
        status: columnId,
      }
    )
  },
}))
