"use client";

import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "react-beautiful-dnd";

import { Card, CardDescription, CardHeader } from "./ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

type Props = {
  id: ColumnType;
  index: number;
  task: Task;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export function TaskCard({
  id,
  index,
  task,
  innerRef,
  draggableProps,
  dragHandleProps,
}: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <Card {...draggableProps} {...dragHandleProps} ref={innerRef}>
          <CardHeader>
            <CardDescription className="line-clamp-3">
              {task.title}
            </CardDescription>
          </CardHeader>
        </Card>
      </HoverCardTrigger>
      {task.description ? (
        <HoverCardContent>{task.description}</HoverCardContent>
      ) : null}
    </HoverCard>
  );
}
