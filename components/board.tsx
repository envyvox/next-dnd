"use client"

import { useEffect } from "react"
import { useBoardStore } from "@/store/board-store"
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd"

import { Column } from "./column"

export function Board() {
  const getBoard = useBoardStore((state) => state.getBoard)
  const board = useBoardStore((state) => state.board)
  const setBoardState = useBoardStore((state) => state.setBoardState)
  const updatetaskInDb = useBoardStore((state) => state.updatetaskInDb)

  useEffect(() => {
    getBoard()
  }, [getBoard])

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) return

    console.log(type)

    if (type === "column") {
      const entries = Array.from(board.columns.entries())
      const [removed] = entries.splice(source.index, 1)

      entries.splice(destination.index, 0, removed)

      const rearrangedColumns = new Map(entries)
      setBoardState({
        ...board,
        columns: rearrangedColumns,
      })

      return
    }

    const columns = Array.from(board.columns)
    const startColIndex = columns[Number(source.droppableId)]
    const endColIndex = columns[Number(destination.droppableId)]

    const startCol: Column = {
      id: startColIndex[0],
      tasks: startColIndex[1].tasks,
    }

    const endCol: Column = {
      id: endColIndex[0],
      tasks: endColIndex[1].tasks,
    }

    if (!startCol || !endCol) return
    if (source.index === destination.index && startCol === endCol) return

    const newTasks = startCol.tasks
    const [taskMoved] = newTasks.splice(source.index, 1)

    if (startCol.id === endCol.id) {
      newTasks.splice(destination.index, 0, taskMoved)

      const newCol: Column = {
        id: startCol.id,
        tasks: startCol.tasks,
      }
      const newColumns = new Map(board.columns)

      newColumns.set(startCol.id, newCol)
      setBoardState({ ...board, columns: newColumns })
    } else {
      const endTasks = Array.from(endCol.tasks)

      endTasks.splice(destination.index, 0, taskMoved)

      const newColumns = new Map(board.columns)
      const newCol: Column = {
        id: startCol.id,
        tasks: newTasks,
      }

      newColumns.set(startCol.id, newCol)
      newColumns.set(endCol.id, {
        id: endCol.id,
        tasks: endTasks,
      })

      updatetaskInDb(taskMoved, endCol.id)
      setBoardState({ ...board, columns: newColumns })
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
          >
            {Array.from(board.columns.entries()).map(([id, column], index) => (
              <Column key={id} id={id} index={index} tasks={column.tasks} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}
