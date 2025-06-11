/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatedResponse = (payload: any) => {
  console.log(payload);

  // Check if payload has the required structure
  if (
    payload &&
    typeof JSON.parse(payload) === "object" &&
    payload.startDate &&
    payload.endDate &&
    payload.taskOne &&
    payload.taskTwo &&
    payload.taskThree
  ) {
    console.log(payload, "if er moddhe");
    const formattedResponse = `
    Start Date: ${payload.startDate}
    End Date: ${payload.endDate}
    Task One: ${payload.taskOne.taskName}
    Tasks: ${payload.taskOne.taskList.join(", ")}
    Task Two: ${payload.taskTwo.taskName}
    Tasks: ${payload.taskTwo.taskList.join(", ")}
    Task Three: ${payload.taskThree.taskName}
    Tasks: ${payload.taskThree.taskList.join(", ")}
    `.trim();

    console.log(formattedResponse);
    return formattedResponse;
  }

  // Return a default message or empty string if structure doesn't match
  console.warn("Payload doesn't match expected structure");
  return "";
};
