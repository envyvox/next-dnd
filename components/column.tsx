import { Draggable, Droppable } from "react-beautiful-dnd";

import { TaskCard } from "./task-card";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

type Props = {
  id: ColumnType;
  index: number;
  tasks: Task[];
};

const idToColumnName: {
  [key in ColumnType]: string;
} = {
  backlog: "Backlog",
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
  canceled: "Canceled",
};

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
                className="h-[75vh] overflow-hidden"
              >
                <ScrollArea className="h-[75vh]">
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
                </ScrollArea>
              </Card>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
