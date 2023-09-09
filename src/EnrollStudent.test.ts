import EnrollStudent from "./EnrollStudent";

describe("Enroll Student", () => {
  it("Should not enroll without valid student name", () => {
    const enrollStudent = new EnrollStudent();
    expect(() => enrollStudent.execute("Ana")).toThrow(
      new Error("Invalid student name")
    );
  });

  it("Should enroll student", () => {
    const enrollStudent = new EnrollStudent();
    expect(() => enrollStudent.execute("Ana Maria")).not.toThrow(
      new Error("Invalid student name")
    );
  });
});
