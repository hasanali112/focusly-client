/* eslint-disable @typescript-eslint/no-explicit-any */
export const formatedResponse = (payload: any) => {
  // Helper function to convert UTC to BDT
  const convertToBDTime = (utcDate: string) => {
    const date = new Date(utcDate);
    return date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" });
  };

  if (typeof payload === "string") {
    const payloadObject = JSON.parse(payload);
    const formattedPayload = `
        Start Date: ${convertToBDTime(payloadObject.startDate)}

        End Date: ${convertToBDTime(payloadObject.endDate)}

        Task One: ${payloadObject.taskOne.taskName}

        Tasks One List: ${payloadObject.taskOne.taskList.join(", ")}

        Task Two: ${payloadObject.taskTwo.taskName}

        Tasks Two List: ${payloadObject.taskTwo.taskList.join(", ")}

        Task Three: ${payloadObject.taskThree.taskName}

        Tasks Three List: ${payloadObject.taskThree.taskList.join(", ")}
    `;
    return formattedPayload.trim(); // Trim for clean output
  }

  return "Invalid payload format.";
};
