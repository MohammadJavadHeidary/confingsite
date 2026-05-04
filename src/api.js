import { supabase } from "./supabaseClient";

// گرفتن todo ها
export const fetchTodos = async () => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("id", { ascending: false });

  if (error) throw error;
  return data;
};

// اضافه کردن todo
export const insertTodo = async (todo) => {
  const { data, error } = await supabase
    .from("todos")
    .insert([todo])
    .select();

  if (error) throw error;
  return data;
};

// حذف
export const deleteTodoApi = async (id) => {
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw error;
};

// آپدیت
export const updateTodoApi = async (id, updates) => {
  const { data, error } = await supabase
    .from("todos")
    .update(updates)
    .eq("id", id)
    .select();

  if (error) throw error;
  return data;
};