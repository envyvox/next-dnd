"use client"

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd"

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card"

type Props = {
  id: ColumnType
  index: number
  task: Task
  innerRef: (element: HTMLElement | null) => void
  draggableProps: DraggableProvidedDraggableProps
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined
}

export function TaskCard({
  id,
  index,
  task,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  return (
    <Card {...draggableProps} {...dragHandleProps} ref={innerRef}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
    </Card>
  )
}
