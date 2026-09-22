"use client"

import { useEffect, useState } from "react"
import { Trash2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "cn"

type Todo = {
  id: string
  text: string
  done: boolean
}

const STORAGE_KEY = "todo-list"

export function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [draft, setDraft] = useState("")
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setTodos(JSON.parse(stored))
    } catch {
      // ignore malformed/unavailable storage
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (!loaded) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch {
      // ignore unavailable storage
    }
  }, [todos, loaded])

  function addTodo() {
    const text = draft.trim()
    if (!text) return
    setTodos((prev) => [...prev, { id: crypto.randomUUID(), text, done: false }])
    setDraft("")
  }

  function toggleTodo(id: string) {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo))
    )
  }

  function removeTodo(id: string) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const remaining = todos.filter((todo) => !todo.done).length

  return (
    <div className="flex flex-col gap-3">
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          addTodo()
        }}
      >
        <Input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Add a task..."
          aria-label="New task"
        />
        <Button type="submit" disabled={!draft.trim()}>
          Add
        </Button>
      </form>

      {todos.length === 0 ? (
        <p className="py-4 text-center text-sm text-muted-foreground">
          No tasks yet. Add one above to get started.
        </p>
      ) : (
        <ul className="flex flex-col gap-1">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="group flex items-center gap-2 rounded-lg px-1.5 py-1 hover:bg-muted/50"
            >
              <Checkbox
                checked={todo.done}
                onCheckedChange={() => toggleTodo(todo.id)}
                aria-label={todo.done ? "Mark as not done" : "Mark as done"}
              />
              <span
                className={cn(
                  "flex-1 text-sm",
                  todo.done && "text-muted-foreground line-through"
                )}
              >
                {todo.text}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="opacity-0 group-hover:opacity-100"
                onClick={() => removeTodo(todo.id)}
                aria-label="Delete task"
              >
                <Trash2Icon />
              </Button>
            </li>
          ))}
        </ul>
      )}

      {todos.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {remaining} of {todos.length} task{todos.length === 1 ? "" : "s"} remaining
        </p>
      )}
    </div>
  )
}
