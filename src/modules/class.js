import { format } from "date-fns";

class Todos {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    const parsedDate = new Date(dueDate);
    this.dueDate = isNaN(parsedDate)
      ? "Invalid Date"
      : format(parsedDate, "MM dd, yyyy");

    this.priority = priority;
    this.isComplete = false;
  }

  toggleComplete() {
    this.isComplete = !this.isComplete;
  }
}

export { Todos };
