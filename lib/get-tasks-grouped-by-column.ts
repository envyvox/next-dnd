import { databases } from "./appwrite"

export async function getTasksGroupedByColumn() {
  const data = await databases.listDocuments(
    process.env.NEXT_PUBLIC_DATABASE_ID!,
    process.env.NEXT_PUBLIC_TASKS_COLLECTION_ID!
  )

  const tasks = data.documents
  const columns = tasks.reduce((acc, task) => {
    if (!acc.get(task.status)) {
      acc.set(task.status, {
        id: task.status,
        tasks: [],
      })
    }

    acc.get(task.status)!.tasks.push({
      $id: task.$id,
      $createdAt: task.$createdAt,
      title: task.title,
      status: task.status,
      ...(task.description && { description: task.description }),
    })

    return acc
  }, new Map<ColumnType, Column>())

  const columnTypes = ["todo", "inprogress", "done"]
  for (const columnType of columnTypes) {
    if (!columns.get(columnType as ColumnType)) {
      columns.set(columnType  as ColumnType, {
        id: columnType as ColumnType,
        tasks: [],
      })
    }
  }

  const board: Board = {
    columns: columns,
  }

  return board
}
