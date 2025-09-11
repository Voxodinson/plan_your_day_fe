import type {
    JSX
} from "vue/jsx-runtime";

type ColumnKey = string | ((item: object, index: number) => JSX.Element) | ((item: object, index: number) => VNode);

interface Column
{
    title: string;
    class?: string;
    key?: ColumnKey;
}

interface ResponseStatus
{
    error: boolean,
    status: string,
    message: string,
    errors: object,
    data: object | null
}

interface DataChild
{
    status: string,
    data: Array<Object> | Object,
    page_no: number,
    per_page: number,
    total: number,
    total_page: number
}

interface Tab
{
    label: string
}

interface Items
{
    [key: string]: string | number;
}

interface Options
{
    [key: string]: Items[]
}

interface Subtask {
  id: number;
  name: string;
  completed: boolean;
}

interface Task {
  id: number;
  name: string;
  description: string;
  date: string;
  list: string;
  completed: boolean;
  due_date: string,
  subtasks: Subtask[];
}

export type
{
    Column,
    DataChild,
    Tab,
    Items,
    Options,
    ResponseStatus,
    Task,
    Subtask
};