import type { TodoListType, TodoType } from '../types'

export function makeTodo(content: string): TodoType {
  return {
    content,
    createdAt: makeDateString(new Date()),
    done: false,
    id: Date.now().toString()
  }
}

function makeDateString(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    timeZone: 'CST',
    hour: 'numeric',
    minute: 'numeric'
  }
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

export function toggleTodoDone(todo: TodoType): TodoType {
  return { ...todo, done: !todo.done }
}

export function addTodo(list: TodoListType, content: string): TodoListType {
  if (list === undefined) return [makeTodo(content)]
  return [makeTodo(content), ...list]
}

export function deleteTodo(list: TodoListType, todo: TodoType): TodoListType {
  return list.filter((item) => todo.id !== item.id)
}

export function handleTodoListDone(
  list: TodoListType,
  todo: TodoType
): TodoListType {
  const toggled = toggleTodoDone(todo)
  const newList = deleteTodo(list, todo)
  if (toggled.done) {
    return newList.length ? [...newList, toggled] : [toggled]
  }
  return newList.length ? [toggled, ...newList] : [toggled]
}
