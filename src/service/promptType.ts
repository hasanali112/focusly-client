const promptTypeOne = (prompt: string) => {
  const refinePrompt = prompt.replace("Weekly Schedule?", "").trim();

  // Get the current date and format it to ISO string with time included
  const currentDate = new Date();
  const startDate = currentDate.toISOString(); // Includes the current time

  // Get the date 7 days later
  const endDate = new Date(currentDate);
  endDate.setDate(currentDate.getDate() + 7);
  const formattedEndDate = endDate.toISOString();

  return `Generate a plain text format study plan for me using the following structure. 
    Ensure that the "startDate" is set to the exact current time in ISO 8601 format (${startDate}) and "endDate" is set to exactly 7 days later (${formattedEndDate}). 
    Do not modify the provided dates.

    Use this  format:
    {
      "startDate": "${startDate}", // Current date and time in ISO format
      "endDate": "${formattedEndDate}", // 7 days later in ISO format
      "taskOne": {
          "taskName": "task one",
          "taskList": string[] // example: ["task1", "task2", "task3"]
      },
      "taskTwo": {
          "taskName": "task two",
          "taskList": string[] 
      },
      "taskThree": {
          "taskName": "task three",
          "taskList": string[] 
      }
    }

    Task list is:
    ${refinePrompt}
  `;
};

export const handleRefinedPrompt = (prompt: string) => {
  if (prompt.toLowerCase().includes("weekly schedule")) {
    return promptTypeOne(prompt);
  } else if (prompt.toLowerCase().includes("audio description")) {
    return "Describe the uploaded audio file.";
  } else if (prompt.toLowerCase().includes("excel analysis")) {
    return "Analyze the uploaded Excel file and extract insights.";
  } else if (prompt.toLowerCase().includes("text summary")) {
    return "Summarize the provided text content.";
  } else if (prompt.toLowerCase().includes("image caption")) {
    return "Generate a caption for the uploaded image.";
  } else {
    return prompt;
  }
};
