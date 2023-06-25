import { Draggable, Droppable } from "react-beautiful-dnd"

import { TaskCard } from "./task-card"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

type Props = {
  id: ColumnType
  index: number
  tasks: Task[]
}

const idToColumnName: {
  [key in ColumnType]: string
} = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
}

export function Column({ id, index, tasks }: Props) {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided) => (
              <Card
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="h-[80vh]"
              >
                <CardHeader>
                  <CardTitle className="flex justify-between">
                    {idToColumnName[id]}
                    <span>{tasks.length}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-5">
                  {tasks.map((task, index) => (
                    <Draggable
                      key={task.$id}
                      draggableId={task.$id}
                      index={index}
                    >
                      {(provided) => (
                        <TaskCard
                          id={id}
                          index={index}
                          task={task}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </CardContent>
              </Card>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  )
}