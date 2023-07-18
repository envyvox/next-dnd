type Board = {
  columns: Map<ColumnType, Column>;
};

type ColumnType = "backlog" | "todo" | "inprogress" | "done" | "canceled";

type Column = {
  id: ColumnType;
  tasks: Tasks[];
};

type Task = {
  $id: string;
  $createdAt: string;
  title: string;
  status: string;
  description?: string;
};
